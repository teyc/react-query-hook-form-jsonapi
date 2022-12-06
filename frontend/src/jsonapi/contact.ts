import { DateOnly } from "../common/contexts/use-axios/jsonapi/jsonapi-date"

export interface Contact {
    id: string
    firstName: string
    lastName: string
    dateOfBirth: DateOnly
    nextOnlineMeeting: Date
}

export const resourceType = "contacts"
