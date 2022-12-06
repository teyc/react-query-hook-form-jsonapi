import { FC, useCallback, useEffect, useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { getContact, saveContact } from "../jsonapi/contact-service"
import { Contact } from "../jsonapi/contact"
import { useForm } from "react-hook-form"

interface ContactsPageProp {
    id: number | null
}

export const ContactsPage: FC<ContactsPageProp> = (props) => {
    const thisContact = useRef<Contact>()

    const getContactQuery = useQuery(
        ["contacts", props.id?.toString()],
        () => getContact(props.id as number),
        {
            enabled: props.id != null,
        }
    )

    const patchContactQuery = useMutation(
        ["contacts", props.id?.toString()],
        (data: Contact) =>
            saveContact(props.id as number, data, thisContact.current as Contact)
    )

    const { handleSubmit, register, reset: resetForm } = useForm<Contact>()

    useEffect(() => {
        const contact = getContactQuery.data
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

    return (
        <>
            <h1>Contacts page 1</h1>
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
