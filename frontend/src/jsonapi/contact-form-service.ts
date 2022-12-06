import { UseFormRegister } from "react-hook-form";
import { fromDateOnlyString, fromDateString } from "../common/contexts/use-axios/jsonapi/jsonapi-date";
import { Contact } from "./contact";

export const getFormFields = (register: UseFormRegister<Contact>) => ({
    firstName: register('firstName'),
    lastName: register('lastName'),
    dateOfBirth: register("dateOfBirth", { setValueAs: v => fromDateOnlyString(v) }),
    nextOnlineMeeting: register("nextOnlineMeeting", { setValueAs: v => fromDateString(v) }),
})