import JSONAPISerializer from "json-api-serializer"
import { DateOnly as DateOnlyImported } from "./date"

export const jsonApiSerializer = new JSONAPISerializer()

export type DateOnly = DateOnlyImported