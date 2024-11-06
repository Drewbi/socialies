import { RequestMessage, ResponseMessage } from "./types";

export function encodeMessage(response: ResponseMessage) {
    return JSON.stringify(response)
}

export function decodeMessage(request: string) {
    return JSON.parse(request) as RequestMessage
}