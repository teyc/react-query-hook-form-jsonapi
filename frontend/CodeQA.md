# 6-Point Code quality check

1. `htmlFor` is set on all the labels

```jsx
// see: src\contacts\ContactsPage.tsx jsx
    return (
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstName">First name</label>
                <input {...form.firstName} id="firstName" />
                {errors.firstName && (<>this is required</>)}
                <br />

                <label htmlFor="lastName">Last name</label>
                <input {...form.lastName} id="lastName" />
                {errors.lastName && (<>this is required</>)}
                <br />

                <label htmlFor="dateOfBirth">Date of birth</label>
                <input {...form.dateOfBirth} id="dateOfBirth" />
                {errors.dateOfBirth && (<>valid format is...</>)}
                <br />

                <label htmlFor="nextOnlineMeeting" >Next online meeting</label>
                <input {...form.nextOnlineMeeting} id="nextOnlineMeeting" />
                {errors.nextOnlineMeeting && (<>valid format is ...</>)}
                <br />

                <input type="submit" />
            </form>
        </>
    )
// end:
```

2. Validation errors set

   Validation error messages must be defined as above

3. Input controls have id set

4. Input controls have data-testid set

5. have a single file with all the crud services e.g `src\jsonapi\contact-service.ts`

6. All the date fields have been properly serialized and deserialized. See `toISODateOnly`, `toISOLocal`, `fromDateOnlyString`, `fromDateString` in the code example below

```ts
// see: src\jsonapi\contact-schema.ts *full*
import JSONAPISerializer from "json-api-serializer"
import { Contact } from "./contact"
import { toISODateOnly, toISOLocal, fromDateOnlyString, fromDateString } from "../common/contexts/use-axios/jsonapi/jsonapi-date"

export const contactSchema: JSONAPISerializer.Options = {
    id: "id",
    whitelist: [
        "firstName",
        "lastName",
        "dateOfBirth",
        "nextOnlineMeeting"
    ],
    relationships: {
        loans: {
            type: "loans"
        }
    },
    beforeSerialize: (entity) => {
        const entity1 = entity as Contact
        const json = {
            ...entity1,
            dateOfBirth: toISODateOnly(entity1.dateOfBirth),
            nextOnlineMeeting: toISOLocal(entity1.nextOnlineMeeting),
        }
        return json
    },
    afterDeserialize: (json: any) => {
        const entity = {
            ...json,
            dateOfBirth: fromDateOnlyString(json.dateOfBirth),
            nextOnlineMeeting: fromDateString(json.nextOnlineMeeting),
        }
        return entity
    },
}
