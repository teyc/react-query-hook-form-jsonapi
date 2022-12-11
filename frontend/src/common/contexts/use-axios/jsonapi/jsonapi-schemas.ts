import { Options } from 'json-api-serializer'
import { contactSchema } from '../../../../jsonapi/contact-schema'
import { loanSchema } from '../../../../jsonapi/loan-schema'

export type JsonApiResource =
  | 'insurance-file'
  | 'contacts'
  | 'loans'

const insuranceFileSchema = {
  id: 'id',
  name: 'name',
  familyId: 'familyId',
  orgId: 'orgId',
  enquirySource: 'enquirySource',
  referrer: 'referrer',
  relationships: {
    pipelineSummary: { type: 'summary' },
    adviser: { type: 'contact' },
    assistant: { type: 'contact' },
    clients: { type: 'contact' },
  },
}


export const schemas: Record<JsonApiResource, Options> = {
  'insurance-file': insuranceFileSchema,
  'contacts': contactSchema,
  'loans': loanSchema,
}
