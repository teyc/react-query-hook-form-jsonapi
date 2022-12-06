import axios from "axios"
import {
  transformFromJsonApiDocument,
  transformToPatchRequest,
} from "../common/contexts/use-axios/jsonapi/jsonapi-serialiser"
import { Contact, resourceType } from "./contact"

export const getContact = async (id: number) => {
  const url = "http://localhost:5164/contacts/:id".replace(":id", id.toString())
  const response = await axios.get(url)
  const contact = transformFromJsonApiDocument<Contact>(resourceType, response.data, )
  return contact
}

export const saveContact = async (
  id: number,
  newValue: Contact,
  originalValue: Contact
) => {
  const url = "http://localhost:5164/contacts/:id".replace(":id", id.toString())
  const diff = transformToPatchRequest(
    id,
    resourceType,
    newValue,
    originalValue
  )
  return await axios.patch(url, diff, {
    headers: {
      "Content-Type": "application/vnd.api+json",
    },
  })
}