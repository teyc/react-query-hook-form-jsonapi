import JSONAPISerializer from "json-api-serializer"
import { stringify } from "qs"
import {
  Filter,
  JsonApiParams,
  JsonApiParamsField,
  JsonApiParamsFilter,
  JsonApiParamsPagination,
  JsonApiParamsSort,
} from "./jsonapi-parameters"
import { JsonApiResource, schemas } from "./jsonapi-schemas"

/** global instance of serializer */
const serializer = new JSONAPISerializer()
for (const [resource, schema] of Object.entries(schemas)) {
  serializer.register(resource, schema)
}

export interface JsonApiPagingResponse {
  firstPageUrl: string
  nextPageUrl: string
}

export interface JsonApiDeserializedResponse {
  records: unknown[] | null
  totalRecords: number | null
  paging: JsonApiPagingResponse
}

function visit(token: Filter): string {
  if (token.tokenType === "filter") {
    return visit(token.child)
  }
  if (token.tokenType === "logical") {
    return `${token.operator}(${token.children.map(visit).join()})`
  }
  if (token.tokenType === "not") {
    return `not(${visit(token.child)})`
  }
  if (token.tokenType === "comparison") {
    return `${token.comparator}(${visit(token.child)})`
  }
  if (token.tokenType === "match") {
    return `${token.comparator}(${visit(token.child)})`
  }
  if (token.tokenType === "any") {
    return `any(${token.field},${token.value
      .map((v) => "'" + `${v}`.replace("'", "''") + "'")
      .join()})`
  }
  if (token.tokenType === "has") {
    return `has(${token.field}${
      token.child != null ? "," + visit(token.child) : ""
    })`
  }
  if (token.tokenType === "count") {
    return `count(${token.field})`
  }
  if (token.tokenType === "node") {
    return `${token.field},'${
      Array.isArray(token.value)
        ? token.value
            .map((v) => "'" + `${v}`.replace("'", "''") + "'")
            .join("','")
        : `${token.value}`.replace("'", "''")
    }'`
  }

  return ""
}

const addFieldsParams = (
  params: Record<string, string>,
  fields: JsonApiParamsField[]
) => {
  fields?.forEach((field) => {
    const fieldKey = `fields[${field.resource}]`
    params[fieldKey] = field.fields.join()
  })
}

const addFiltersParams = (
  params: Record<string, string>,
  filters: JsonApiParamsFilter[]
) => {
  filters?.forEach((filter) => {
    const filterValue = visit(filter.definition)
    const filterKey = filter.resource ? `filter[${filter.resource}]` : "filter"
    params[filterKey] = filterValue
  })
}

const addPageParams = (
  params: Record<string, string>,
  page: JsonApiParamsPagination
) => {
  const numbers: string[] = []
  const sizes: string[] = []

  if (page.number !== undefined) numbers.push(`${page.number}`)
  if (page.size !== undefined) sizes.push(`${page.size}`)

  if (page.included) {
    page.included.forEach((incl) => {
      if (incl.number != null) {
        numbers.push(`${incl.resource}:${incl.number}`)
      }
      if (incl.size != null) {
        sizes.push(`${incl.resource}:${incl.size}`)
      }
    })
  }

  if (numbers.length > 0) {
    params["page[number]"] = numbers.join()
  }
  if (sizes.length > 0) {
    params["page[size]"] = sizes.join()
  }
}

const addSortParams = (
  params: Record<string, string>,
  sort: JsonApiParamsSort[]
) => {
  const sortQuery: string[] = []
  const includedResource: string[] = []

  sort.forEach((sortElement) => {
    if (!sortElement.resource) {
      sortQuery.push(
        sortElement.direction === "desc"
          ? `-${sortElement.field}`
          : sortElement.field
      )
    } else if (!includedResource.includes(sortElement.resource)) {
      includedResource.push(sortElement.resource)
    }
  })

  if (sortQuery.length > 0) {
    params.sort = sortQuery.join()
  }

  includedResource.forEach((resource) => {
    const includedResourceSorts = sort.filter((s) => s.resource === resource)
    const includedSortQuery: string[] = []
    includedResourceSorts.forEach((s) => {
      includedSortQuery.push(s.direction === "desc" ? `-${s.field}` : s.field)
    })
    const includeSortKey = `sort[${resource}]`
    params[includeSortKey] = includedSortQuery.join()
  })
}

export const getJsonApiParamDictionary = (
  jsonApiParams: JsonApiParams
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
{ [x: string]: any } => {
  const {
    filters,
    sort,
    fields,
    include,
    page,
    customFilters,
    ...otherParams
  } = jsonApiParams

  const params: Record<string, string> = {}

  if (filters) {
    addFiltersParams(params, filters)
  }

  if (include) {
    params.include = include?.map((include) => include.resource).join(",")
  }

  if (sort) {
    addSortParams(params, sort)
  }

  if (page) {
    addPageParams(params, page)
  }

  if (fields) {
    addFieldsParams(params, fields)
  }

  return { ...otherParams, ...params }
}

export const jsonApiParamSerializer = (
  jsonApiParams: JsonApiParams
): string => {
  const params = getJsonApiParamDictionary(jsonApiParams)
  return stringify(params, {
    arrayFormat: "brackets",
    encodeValuesOnly: true,
  })
}

export function jsonApiResponseTransformer<T>(
  data: string,
  resource: JsonApiResource
): T {
  const obj = JSON.parse(data)
  return serializer.deserialize(resource, obj) as T
}


export function transformToPatchRequest<TResource>(id: number, resourceType: string, newValue: TResource, originalValue: TResource) {
  const originalJson = serializer.serialize(resourceType, originalValue);
  const newJson = serializer.serialize(resourceType, newValue);

  const originalData = (originalJson.data as JSONAPISerializer.ResourceObject<TResource>).attributes as Omit<TResource, "id">;
  const newData = (newJson.data as JSONAPISerializer.ResourceObject<TResource>).attributes as Omit<TResource, "id">;
  const patch = Object.keys(newData).reduce((accum: any, currentKey) => {
      const originalValue = (originalData as { [propName: string]: any; })[currentKey];
      const newValue = (newData as { [propName: string]: any; })[currentKey];
      if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
          return {
              ...accum,
              [currentKey]: (newData as { [propName: string]: any; })[currentKey]
          };
      } else {
          return accum;
      }
  }, {});
  return {
      ...newJson,
      data: {
          ...newJson.data,
          attributes: patch
      }
  };
}