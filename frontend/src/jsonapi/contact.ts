import JSONAPISerializer from "json-api-serializer"
import { DateOnly, jsonApiSerializer } from "."
import { toISODateOnly, toISOLocal, fromDateOnlyString } from "./date"

export interface Contact {
    id: string
    firstName: string
    lastName: string
    dateOfBirth: DateOnly
    nextOnlineMeeting: Date
}

export const resourceType = "contacts"

var isRegistered = false

export function registerJsonApi(jsonApiSerializer: JSONAPISerializer) {
    if (isRegistered) return

    jsonApiSerializer.register(resourceType, {
        id: "id",
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
                nextOnlineMeeting: new Date(json.nextOnlineMeeting),
            }
            return entity
        },
    })

    isRegistered = true
}

registerJsonApi(jsonApiSerializer)
