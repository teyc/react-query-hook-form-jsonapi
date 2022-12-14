/**
 * This file should be autogenerated
 */
import axios from "axios"
import {
  transformFromJsonApiDocument,
  transformToPatchRequest,
  transformToPostRequest,
} from "../common/contexts/use-axios/jsonapi/jsonapi-serialiser"
import { Contact, resourceType } from "./contact"

// CREATE
export const createContact = async (newValue: Contact) => {
  const url = "http://localhost:5164/contacts/"
  const request = transformToPostRequest(resourceType, newValue)
  const response = await axios.post(url, request, {
    headers: {
      "Content-Type": "application/vnd.api+json",
    },
  })
  const contact = transformFromJsonApiDocument<Contact>(
    resourceType,
    response.data
  )
  return contact
}

// READ
export const getContacts = async () => {
  const url = "http://localhost:5164/contacts/?include=loans"
  const response = await axios.get(url, {
    headers: {
      "Accept": "application/vnd.api+json"
    }
  })
  const contacts = transformFromJsonApiDocument<Contact[]>(
    resourceType,
    response.data
  )
  return contacts
}

// READ
export const getContact = async (id: number) => {
  const url = "http://localhost:5164/contacts/:id?include=loans".replace(":id", id.toString())
  const response = await axios.get(url)
  const contact = transformFromJsonApiDocument<Contact>(
    resourceType,
    response.data
  )
  return contact
}

// UPDATE
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

// DELETE
export const deleteContact = async (
  id: string
) => {
  const url = "http://localhost:5164/contacts/:id".replace(":id", id.toString())
  return await axios.delete(url)
}