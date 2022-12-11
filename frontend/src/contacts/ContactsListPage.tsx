import React, { FC, useRef } from "react"
import { Contact } from "../jsonapi/contact"
import { useContactCrudService } from "../jsonapi/contact-react-query"

export interface ContactsListPageProp {
    sample?: string
}

export const ContactsListPage: FC<ContactsListPageProp> = (props) => {

    const thisContact = useRef<Contact>()

    const { deleteContactQuery, getContactsQueryData } = useContactCrudService(null, thisContact)

    async function handleDeleteContact(id: string) {
        await deleteContactQuery.mutate(id)
    }

    return (
        <>
            <h1>Contacts list</h1>
            <ul>
                {getContactsQueryData?.map((contact) => (
                    <li key={contact.id}>
                        <a href={`/contacts/${contact.id}`}>
                            {contact.firstName} {contact.lastName} <button onClick={(_) => { handleDeleteContact(contact.id) }}>Delete</button>
                        </a>
                    </li>
                ))}
            </ul>
            <a href="/contacts/new">New item</a>
        </>
    )
}
