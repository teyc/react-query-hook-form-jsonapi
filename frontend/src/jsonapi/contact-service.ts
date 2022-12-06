import axios from "axios"
import {
  transformFromJsonApiDocument,
  transformToPatchRequest,
  transformToPostRequest,
} from "../common/contexts/use-axios/jsonapi/jsonapi-serialiser"
import { Contact, resourceType } from "./contact"

export const createContact = async (newValue: Contact) => {
  const url = "http://localhost:5164/contacts/"
  const request = transformToPostRequest(resourceType, newValue)
  const response = await axios.post(url, request, {
    headers: {
      "Content-Type": "application/vnd.api+json",
    },
  })

  // TODO return something with the saved id, so that react-query key can be invalidated
  return response.data
}

export const getContacts = async () => {
  const url = "http://localhost:5164/contacts/"
  const response = await axios.get(url)
  const contacts = transformFromJsonApiDocument<Contact[]>(
    resourceType,
    response.data
  )
  return contacts
}

export const getContact = async (id: number) => {
  const url = "http://localhost:5164/contacts/:id".replace(":id", id.toString())
  const response = await axios.get(url)
  const contact = transformFromJsonApiDocument<Contact>(
    resourceType,
    response.data
  )
  return contact
}

export const updateContact = async (
  id: number,
  { newValue, originalValue }: { newValue: Contact; originalValue: Contact }
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
