import axios from 'axios'
import { Contact, registerJsonApi as registerContact, resourceType } from './contact'
import { jsonApiSerializer } from '.'
import JSONAPISerializer from 'json-api-serializer'

export const getContact = async (id: number) => {
    const url = "http://localhost:5164/contacts/:id".replace(":id", id.toString())
    const response = await axios.get(url)
    registerContact(jsonApiSerializer)
    const contact = jsonApiSerializer.deserialize('contact', response.data) as Contact
    return contact
}

export const saveContact =
    async (id: number, newValue: Contact, originalValue: Contact) => {
        const url = "http://localhost:5164/contacts/:id".replace(":id", id.toString())
        const diff = diffContact(id, newValue, originalValue)
        return await axios.patch(url, diff, {
            headers: {
                'Content-Type': 'application/vnd.api+json'
            }
        })
    }

const diffContact =
    (id: number, newValue: Contact, originalValue: Contact) => {
        const originalJson = jsonApiSerializer.serialize(resourceType, originalValue)
        const newJson = jsonApiSerializer.serialize(resourceType, newValue)

        const originalData = (originalJson.data as JSONAPISerializer.ResourceObject<Contact>).attributes as Omit<Contact, "id">
        const newData = (newJson.data as JSONAPISerializer.ResourceObject<Contact>).attributes as Omit<Contact, "id">
        const patch = Object.keys(newData).reduce((accum: any, currentKey) => {
            const originalValue = (originalData as { [propName: string]: any })[currentKey]
            const newValue = (newData as { [propName: string]: any })[currentKey]
            if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
                return {
                    ...accum,
                    [currentKey]: (newData as { [propName: string]: any })[currentKey]
                }
            } else {
                return accum
            }
        }, {})
        return {
            ...newJson,
            data: {
                ...newJson.data,
                attributes: patch
            }
        }
    }