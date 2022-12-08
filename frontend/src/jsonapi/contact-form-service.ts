import { UseFormRegister } from "react-hook-form";
import { Contact } from "./contact";

export const getFormFields = (register: UseFormRegister<Contact>) => ({
    firstName: register('firstName'),
    lastName: register('lastName'),
    dateOfBirth: register("dateOfBirth", { valueAsDate: true }),
    nextOnlineMeeting: register("nextOnlineMeeting", { valueAsDate: true }),
})