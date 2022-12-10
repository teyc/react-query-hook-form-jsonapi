# The foolproof guide to React for Line of Business applications

This assumes you already have a React project bootstrapped
and ready to go

## 1. Write the view

The following won't compile since we haven't defined
the variables yet

```tsx
import React, { FC } from 'react'

export const ContactsPage: FC<{}> = (props) => {
// see: src\contacts\ContactsPage.tsx jsx
    return (
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First name</label>
                <input {...form.firstName} />
                {errors.firstName && (<>this is required</>)}
                <br />

                <label>Last name</label>
                <input {...form.lastName} />
                {errors.lastName && (<>this is required</>)}
                <br />

                <label>Date of birth</label>
                <input {...form.dateOfBirth} />
                {errors.dateOfBirth && (<>valid format is...</>)}
                <br />

                <label>Next online meeting</label>
                <input {...form.nextOnlineMeeting} />
                {errors.nextOnlineMeeting && (<>valid format is ...</>)}
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
    const { register, } = useForm<Contact>()

// see: ./src/contacts/ContactsPage.tsx register-form-fields
    const form = getFormFields(register)
// end:
```

<!-- see: ../Format-CodeSnippet.ps1 how-to-insert -->
## Note

This document contains generated section, to keep it up-to-date

```
.\Format-CodeSnippet.ps1 .\path\to\this\file.md
```
<!-- end: -->
