import React, { FC, useCallback, useEffect, useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { createContact, getContact, updateContact } from "../jsonapi/contact-service"
import { Contact } from "../jsonapi/contact"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import { AxiosError } from "axios"
import { getFormFields } from "../jsonapi/contact-form-service"

interface ContactsPageProp {
    unused?: string
}

export const ContactsPage: FC<ContactsPageProp> = (props) => {
    const thisContact = useRef<Contact>()

    // get :contactId from route - either int or "new"
    const routeParams = useParams()
    const id = routeParams["contactId"] === 'new' || !routeParams["contactId"]
        ? null
        : parseInt(routeParams["contactId"])

    const {
        isLoading: getContactQueryIsLoading,
        isError: getContactQueryIsError,
        data: getContactQueryData,
        error: getContactQueryError } = useQuery<Contact>(
            ["contacts", id?.toString()],
            () => getContact(id as number),
            {
                enabled: id != null,
            }
        )

    const createContactQuery = useMutation(
        ["contacts"],
        (newValue: Contact) => createContact(newValue)
    )

    const patchContactQuery = useMutation(
        ["contacts", id?.toString()],
        (newValue: Contact) =>
            updateContact(id as number, {
                newValue,
                originalValue: thisContact.current as Contact
            })
    )

    const { handleSubmit, register, reset: resetForm } = useForm<Contact>()

    useEffect(() => {
        const contact = getContactQueryData
        if (contact != null && thisContact.current !== contact) {
            thisContact.current = contact
            resetForm(contact)
        }
    })

    const onSubmit = useCallback(
        async (contact: Contact) => {
            if (id != null) {
                await patchContactQuery.mutateAsync(contact)
            } else {
                await createContactQuery.mutateAsync(contact)
            }
        },
        [patchContactQuery]
    )

    if (getContactQueryIsLoading) {
        return (<>
            <div>Loading ...</div>
        </>)
    }

    if (getContactQueryIsError) {
        return (<>
            <div>Error {(getContactQueryError as AxiosError)?.message as string}</div>
        </>)
    }

    const title = typeof id == "number" ? `Contacts page ${id}` : "New contact"

    const {
        firstName,
        lastName,
        dateOfBirth,
        nextOnlineMeeting,
    } = getFormFields(register)

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
}
