import JSONAPISerializer from "json-api-serializer"
import { Loan } from "./loan"

export const loanSchema: JSONAPISerializer.Options = {
    id: "id",
    beforeSerialize: (entity) => {
        const entity1 = entity as Loan
        const json = {
            ...entity1,
        }
        return json
    },
    afterDeserialize: (json: any) => {
        const entity = {
            ...json,
        }
        return entity
    },
}