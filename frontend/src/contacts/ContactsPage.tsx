import { FC, useEffect } from 'react'
import axios, { isCancel, AxiosError } from 'axios'
import { jsonApiSerializer } from '../jsonapi'

interface ContactsPageProp {

}



export const ContactsPage: FC<ContactsPageProp> = (props) => {

    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:5164/contacts/1")
            const contact = jsonApiSerializer.deserialize('contact', response.data)
            console.log(contact)
            console.log((jsonApiSerializer.serialize('contact', contact).data as any).attributes)
        })()
    })

    return <>
        <h1>Contacts page 1</h1>
    </>
}