import React, { FC, useCallback, useEffect, useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { createContact, getContact, updateContact } from "../jsonapi/contact-service"
import { Contact } from "../jsonapi/contact"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
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

    const navigate = useNavigate()

    // CREATE
    const createContactQuery = useMutation(
        ["contacts"],
        (newValue: Contact) => createContact(newValue)
    )

    // READ
    const { data: getContactQueryData } = useQuery<Contact>(
        ["contacts", id?.toString()],
        () => getContact(id as number),
        {
            enabled: id != null,
        }
    )

    // UPDATE
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
                const createdContact = await createContactQuery.mutateAsync(contact)
                thisContact.current = createdContact
                navigate("/contacts/")
            }
        },
        [createContactQuery, id, navigate, patchContactQuery]
    )

    const title = typeof id == "number" ? `Contacts page ${id}` : "New contact"

    /** register-form-fields : begin */
    const form = getFormFields(register)
    /** register-form-fields : end */

    /** jsx : begin */
    return (
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First name</label>
                <input {...form.firstName} />
                {errors.firstName && (<>this is required</>)}
                <br />

                <label>Last name</label>
                <input {...form.lastName} />
                {errors.lastName && (<>this is required</>)}
                <br />

                <label>Date of birth</label>
                <input {...form.dateOfBirth} />
                {errors.dateOfBirth && (<>valid format is...</>)}
                <br />

                <label>Next online meeting</label>
                <input {...form.nextOnlineMeeting} />
                {errors.nextOnlineMeeting && (<>valid format is ...</>)}
                <br />

                <input type="submit" />
            </form>
        </>
    )
    /** jsx : end */
}
