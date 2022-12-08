# The foolproof guide to React for Line of Business applications

## 1. Write the view

```tsx
// see: src\contacts\ContactsPage.tsx jsx
    return (
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First name</label>
                <input {...firstName} />
                <br />

                <label>Last name</label>
                <input {...lastName} />
                <br />

                <label>Date of birth</label>
                <input {...dateOfBirth} />
                <br />

                <label>Next online meeting</label>
                <input {...nextOnlineMeeting} />
                <br />

                <input type="submit" />
            </form>
        </>
    )
```

and put the view in a component

```tsx
export const ContactsPage: FC<{}> = (props) => {
    return (
        <!-- JSX here -->
    )
}
```

## 2. Model the view (view model)

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
```

## 3. Write the mapping and validation

```ts
// see: src\jsonapi\contact-form-service.ts *full*
import { UseFormRegister } from "react-hook-form";
import { Contact } from "./contact";

export const getFormFields = (register: UseFormRegister<Contact>) => ({
    firstName: register('firstName'),
    lastName: register('lastName'),
    dateOfBirth: register("dateOfBirth", { valueAsDate: true }),
    nextOnlineMeeting: register("nextOnlineMeeting", { valueAsDate: true }),
})
```

## 4. Register mapping and validation

todo

## Note

This document contains generated section, to keep it up-to-date

```
.\Format-CodeSnippet.ps1 .\frontend\GUIDE.md
```
