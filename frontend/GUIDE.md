# The foolproof guide to React for Line of Business applications

This assumes you already have a React project bootstrapped
and ready to go

## 1. Write the view

The following won't compile since we haven't defined
the variables yet

```tsx
import React, { FC } from "react"

export const ContactsPage: FC<{}> = (props) => {
  // see: src\contacts\ContactsPage.tsx jsx
  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First name</label>
        <input {...form.firstName} id="firstName" />
        {errors.firstName && <>this is required</>}
        <br />

        <label htmlFor="lastName">Last name</label>
        <input {...form.lastName} id="lastName" />
        {errors.lastName && <>this is required</>}
        <br />

        <label htmlFor="dateOfBirth">Date of birth</label>
        <input {...form.dateOfBirth} id="dateOfBirth" />
        {errors.dateOfBirth && <>valid format is...</>}
        <br />

        <label htmlFor="nextOnlineMeeting">Next online meeting</label>
        <input {...form.nextOnlineMeeting} id="nextOnlineMeeting" />
        {errors.nextOnlineMeeting && <>valid format is ...</>}
        <br />

        <input type="submit" />
      </form>
    </>
  )
  // end:
}
```

## 2. Model the editable part of the view

You can use either a class or an interface. The example below uses
an interface because it's mapped directly to a Json response.

> Note: the DateOnly type is used for dates that don't
> have a time component

```ts
// see: src\jsonapi\contact.ts *full*
import { DateOnly } from "../common/contexts/use-axios/jsonapi/jsonapi-date"

export interface Contact {
    id: string
    firstName: string
    lastName: string
    dateOfBirth: DateOnly
    nextOnlineMeeting: Date
}

export const resourceType = "contacts"
// end:
```

## 3. Write the mapping and validation

We use react-hook-form, and there are a bunch of validation
methods available.

```ts
// see: src\jsonapi\contact-form-service.ts *full*
import { UseFormRegister } from "react-hook-form";
import { Contact } from "./contact";

export const getFormFields = (register: UseFormRegister<Contact>) => ({
    firstName: register('firstName', { required: true }),
    lastName: register('lastName', { required: true }),
    dateOfBirth: register("dateOfBirth", { valueAsDate: true, required: true }),
    nextOnlineMeeting: register("nextOnlineMeeting", { valueAsDate: true }),
})
// end:
```

## 4. Register mapping and validation

Once the form fields are defined, they have to be registered
with react-hook-form

```ts
const { register } = useForm<Contact>()

// see: ./src/contacts/ContactsPage.tsx register-form-fields
    const form = getFormFields(register)
// end:
```

## 5. Define all CRUD services in a single file

```tsx
// see: src\jsonapi\contact-service.ts *full*
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
// end:
```

## 6. Define corresponding React Query equivalent for each service

```ts
// see: src\jsonapi\contact-react-query.ts *full*
import { useMutation, useQuery } from "react-query"
import { Contact } from "./contact"
import {
    createContact,
    deleteContact,
    getContact,
    getContacts,
    updateContact,
} from "./contact-service"

export function useContactCrudService(
    id: number | null,
    thisContact: React.MutableRefObject<Contact | undefined>
) {
    // CREATE
    const createContactQuery = useMutation(["contacts"], (newValue: Contact) =>
        createContact(newValue)
    )

    // READ
    const { data: getContactQueryData } = useQuery<Contact>(
        ["contacts", id?.toString()],
        () => getContact(id as number),
        {
            enabled: id != null,
        }
    )

    // LIST
    const { data: getContactsQueryData } = useQuery(
        ["contacts"],
        () => getContacts(),
        {
            enabled: true,
        }
    )

    // UPDATE
    const patchContactQuery = useMutation(
        ["contacts", id?.toString()],
        (newValue: Contact) =>
            updateContact(id as number, {
                newValue,
                originalValue: thisContact.current as Contact,
            })
    )

    // DELETE
    const deleteContactQuery = useMutation(["contacts"], (id: string) =>
        deleteContact(id)
    )

    return {
        createContactQuery,
        getContactQueryData,
        getContactsQueryData,
        patchContactQuery,
        deleteContactQuery,
    }
}
// end:
```

<!-- see: ../Format-CodeSnippet.ps1 how-to-insert -->
## Note

This document contains generated section, to keep it up-to-date

```
.\Format-CodeSnippet.ps1 .\path\to\this\file.md
```
<!-- end: -->
