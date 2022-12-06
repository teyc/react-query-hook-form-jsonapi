import { FC, useCallback, useEffect, useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { getContact, updateContact as updateContact } from "../jsonapi/contact-service"
import { Contact } from "../jsonapi/contact"
import { useForm } from "react-hook-form"
import React from "react"
import { useParams } from "react-router"
import { AxiosError } from "axios"

interface ContactsPageProp {
    unused?: string
}

export const ContactsPage: FC<ContactsPageProp> = (props) => {
    const thisContact = useRef<Contact>()

    const urlParams = useParams()
    const id = urlParams["contactId"] ? parseInt(urlParams["contactId"]) : null

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
            await patchContactQuery.mutateAsync(contact)
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

    return (
        <>
            <h1>Contacts page {id}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First name</label>
                <input {...register("firstName")} />
                <br />

                <label>Last name</label>
                <input {...register("lastName")} />
                <br />

                <label>Date of birth</label>
                <input {...register("dateOfBirth")} />
                <br />

                <label>Next online meeting</label>
                <input {...register("nextOnlineMeeting")} />
                <br />

                <input type="submit" />
            </form>
        </>
    )
}
