export type RequestType = 'register'
  
export interface RequestMessage {
    type: RequestType,
    data?: any   
}

export type ResponseType = 'ok' | 'notok' | 'connected'

export interface ResponseMessage {
    type: ResponseType,
    data?: any
}

interface PlayerState {
    name: string,
    target: string | null,
    points: number
}

export type GameState = { [key: string]: PlayerState }