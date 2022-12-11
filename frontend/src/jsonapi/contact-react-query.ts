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
