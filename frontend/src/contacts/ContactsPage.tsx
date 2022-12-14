import React, { FC, useCallback, useEffect, useRef } from "react"
import { Contact } from "../jsonapi/contact"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { getFormFields } from "../jsonapi/contact-form-service"
import { useContactCrudService } from "../jsonapi/contact-react-query"

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

    const { createContactQuery, getContactQueryData, patchContactQuery } = useContactCrudService(id, thisContact)

    const { formState: { errors, isDirty }, handleSubmit, register, reset: resetForm } = useForm<Contact>()

    useEffect(() => {
        const contact = getContactQueryData
        if (contact != null && thisContact.current !== contact) {
            thisContact.current = contact
            resetForm(contact)
        }
    })

    const onNavigateAwayFromDirtyForm = useCallback((e: Event) => {
        if (isDirty) {
            e.preventDefault()
            return "There are unsaved unchanges. Is it ok to discard?"
        }
    }, [isDirty])

    // initialize
    useEffect(() => {
        window.onbeforeunload = onNavigateAwayFromDirtyForm
        return () => {
            window.onbeforeunload = null
        }
    })

    const onSubmit = useCallback(
        async (contact: Contact) => {
            if (id != null) {
                await patchContactQuery.mutateAsync(contact)
            } else {
                const createdContact = await createContactQuery.mutateAsync(contact)
                thisContact.current = createdContact
                navigate(`/contacts/${createdContact.id}`)
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
                <label htmlFor="firstName">First name</label>
                <input {...form.firstName} id="firstName" />
                {errors.firstName && (<>this is required</>)}
                <br />

                <label htmlFor="lastName">Last name</label>
                <input {...form.lastName} id="lastName" />
                {errors.lastName && (<>this is required</>)}
                <br />

                <label htmlFor="dateOfBirth">Date of birth</label>
                <input {...form.dateOfBirth} id="dateOfBirth" />
                {errors.dateOfBirth && (<>valid format is...</>)}
                <br />

                <label htmlFor="nextOnlineMeeting" >Next online meeting</label>
                <input {...form.nextOnlineMeeting} id="nextOnlineMeeting" />
                {errors.nextOnlineMeeting && (<>valid format is ...</>)}
                <br />

                <input type="submit" />
            </form>
        </>
    )
    /** jsx : end */
}
