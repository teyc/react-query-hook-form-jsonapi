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