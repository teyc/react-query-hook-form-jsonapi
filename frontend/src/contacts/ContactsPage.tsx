import { FC, useEffect } from 'react'
import axios, { isCancel, AxiosError } from 'axios'
import JSONAPISerializer from 'json-api-serializer'

interface ContactsPageProp {

}

namespace ApiModels {
    type DateOnly = Date

    export interface Contact {
        firstName: string
        lastName: string
        dateOfBirth: DateOnly
        nextOnlineMeeting: Date
    }

    export function fromDateOnlyString(src: string) {
        const dateParts = src.split('-').map(s => parseInt(s, 10))
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
    }

    export function toISODateOnly(src: DateOnly) {
        return src.toISOString().split('T')[0]
    }

    export function toISOLocal(d: Date) {
        var z  = (n: number) =>  ('0' + n).slice(-2);
        var zz = (n: number) => ('00' + n).slice(-3);
        var off = d.getTimezoneOffset();
        var sign = off > 0? '-' : '+';
        off = Math.abs(off);

        return d.getFullYear() + '-'
               + z(d.getMonth()+1) + '-' +
               z(d.getDate()) + 'T' +
               z(d.getHours()) + ':'  +
               z(d.getMinutes()) + ':' +
               z(d.getSeconds()) + '.' +
               zz(d.getMilliseconds()) +
               sign + z(off/60|0) + ':' + z(off%60);
      }
}

export const ContactsPage: FC<ContactsPageProp> = (props) => {

    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:5164/contacts/1")
            const serializer = new JSONAPISerializer()
            serializer.register('contact', {
                id: 'id',
                beforeSerialize: (entity) => {
                    const entity1 = entity as ApiModels.Contact
                    const json = {
                        ...entity1,
                        dateOfBirth: ApiModels.toISODateOnly(entity1.dateOfBirth),
                        nextOnlineMeeting: ApiModels.toISOLocal(entity1.nextOnlineMeeting)
                    }
                    return json
                },
                afterDeserialize: (json: any) => {
                    const entity = {
                        ...json,
                        dateOfBirth: ApiModels.fromDateOnlyString(json.dateOfBirth),
                        nextOnlineMeeting: new Date(json.nextOnlineMeeting) }
                    return entity
                }
            })
            const contact = serializer.deserialize('contact', response.data)
            console.log(contact)
            console.log((serializer.serialize('contact', contact).data as any).attributes)
        })()
    })

    return <>
        <h1>Contacts page 1</h1>
    </>
}