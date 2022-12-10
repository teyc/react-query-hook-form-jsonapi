import { UseFormRegister } from "react-hook-form";
import { Contact } from "./contact";

export const getFormFields = (register: UseFormRegister<Contact>) => ({
    firstName: register('firstName', { required: true }),
    lastName: register('lastName', { required: true }),
    dateOfBirth: register("dateOfBirth", { valueAsDate: true, required: true }),
    nextOnlineMeeting: register("nextOnlineMeeting", { valueAsDate: true }),
})