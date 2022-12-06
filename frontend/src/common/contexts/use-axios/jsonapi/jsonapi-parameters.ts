import { JsonApiResource } from './jsonapi-schemas'

export interface JsonApiParams {
  page?: JsonApiParamsPagination
  filters?: JsonApiParamsFilter[]
  sort?: JsonApiParamsSort[]
  fields?: JsonApiParamsField[]
  include?: JsonApiParamsRelationship[]
  [x: string]: unknown
}

export interface JsonApiParamsPagination {
  size?: number
  number?: number
  included?: JsonApiParamsPaginationIncluded[]
}

export interface JsonApiParamsPaginationIncluded {
  size: number
  number?: number
  resource: string
}

export interface JsonApiParamsSort {
  direction: 'asc' | 'desc' | undefined
  field: string
  resource?: string
}

export interface JsonApiParamsField {
  resource: JsonApiResource
  fields: string[]
}

export interface JsonApiParamsRelationship {
  resource: string
}

export interface JsonApiParamsFilter {
  resource?: string
  definition: JsonApiParamsFilterToken
}

// Filter structures defined here: https://www.jsonapi.net/usage/reading/filtering.html#filter-syntax
export interface JsonApiParamsFilterToken {
  tokenType: 'filter'
  child: FilterExpression
}

export interface JsonApiParamsFilterLogicalToken {
  tokenType: 'logical'
  operator: 'and' | 'or'
  children: Array<FilterExpression | JsonApiParamsFilterToken>
}

export interface JsonApiParamsFilterNotToken {
  tokenType: 'not'
  child: FilterExpression | JsonApiParamsFilterToken
}

export interface JsonApiParamsFilterComparisonToken {
  tokenType: 'comparison'
  comparator: ComparatorType
  child: JsonApiParamsFilterCountToken | JsonApiParamsFilterNodeToken
}

export interface JsonApiParamsFilterMatchToken {
  tokenType: 'match'
  comparator: 'contains' | 'startsWith' | 'endsWith'
  child: JsonApiParamsFilterNodeToken
}

export interface JsonApiParamsFilterAnyToken {
  tokenType: 'any'
  field: string
  value: unknown[]
}

export interface JsonApiParamsFilterHasToken {
  tokenType: 'has'
  field: string
  child?: FilterExpression | JsonApiParamsFilterToken
}

export interface JsonApiParamsFilterCountToken {
  tokenType: 'count'
  field: string
}

export interface JsonApiParamsFilterNodeToken {
  tokenType: 'node'
  field: string
  value: unknown
}

// See: https://www.jsonapi.net/usage/reading/filtering.html#filter-syntax
export type FilterExpression =
  | JsonApiParamsFilterAnyToken
  | JsonApiParamsFilterComparisonToken
  | JsonApiParamsFilterHasToken
  | JsonApiParamsFilterLogicalToken
  | JsonApiParamsFilterMatchToken
  | JsonApiParamsFilterNotToken

export type ComparatorType =
  | 'equals'
  | 'greaterThan'
  | 'greaterOrEqual'
  | 'lessThan'
  | 'lessOrEqual'

// Node & Count are parts of filters, but not filters (by themselves)
export type Filter =
  | FilterExpression
  | JsonApiParamsFilterNodeToken
  | JsonApiParamsFilterCountToken
  | JsonApiParamsFilterToken
