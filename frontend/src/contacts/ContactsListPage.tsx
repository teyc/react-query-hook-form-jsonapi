import React, { FC } from "react"
import { useQuery } from "react-query"
import { getContacts } from "../jsonapi/contact-service"

export interface ContactsListPageProp {
    sample?: string
}

export const ContactsListPage: FC<ContactsListPageProp> = (props) => {
    const getContactQuery = useQuery(["contacts"], () => getContacts(), {
        enabled: true,
    })

    return (
        <>
            <h1>Contacts list</h1>
            <ul>
                {getContactQuery.data?.map((contact) => (
                    <li key={contact.id}>
                        <a href={`/contacts/${contact.id}`}>
                            {contact.firstName} {contact.lastName}
                        </a>
                    </li>
                ))}
            </ul>
            <a href="">New item</a>
        </>
    )
}
