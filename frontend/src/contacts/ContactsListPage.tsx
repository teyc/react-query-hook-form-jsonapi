import React, { FC } from "react"
import { useMutation, useQuery } from "react-query"
import { deleteContact, getContacts } from "../jsonapi/contact-service"

export interface ContactsListPageProp {
    sample?: string
}

export const ContactsListPage: FC<ContactsListPageProp> = (props) => {
    const getContactQuery = useQuery(["contacts"], () => getContacts(), {
        enabled: true,
    })
    
    const deleteContactQuery = useMutation(
        ["contacts"],
        (id: string) => deleteContact(id)
    )

    async function handleDeleteContact(id: string){
        await deleteContactQuery.mutate(id)
    }

    return (
        <>
            <h1>Contacts list</h1>
            <ul>
                {getContactQuery.data?.map((contact) => (
                    <li key={contact.id}>
                        <a href={`/contacts/${contact.id}`}>
                            {contact.firstName} {contact.lastName} <button onClick={(_) => {handleDeleteContact(contact.id) }}>Delete</button>
                        </a>
                    </li>
                ))}
            </ul>
            <a href="">New item</a>
        </>
    )
}
