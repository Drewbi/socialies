import type * as Party from "partykit/server";

export type RequestType =
    'register' |
    'start' |
    'canstart' |
    'target' |
    'newtarget' |
    'answer' |
    'seekers' |
    'guess'
  
export interface RequestMessage {
    type: RequestType,
    data?: any   
}

export type ResponseType = 
    'ok' |
    'notok' |
    'connected' |
    'start' |
    'target' |
    'newtarget' |
    'needregister' |
    'notstarted' |
    'answerpending' |
    'answerconfirmed' |
    'gettingot' |
    'gotgot' |
    'seekers' |
    'guesscorrect' |
    'badguess'

export interface ResponseMessage {
    type: ResponseType,
    data?: any
}

interface PlayerState {
    name: string,
    target: string | null,
    points: number,
    question: string | null,
    answers: {
        q: string,
        a: string,
    }[],
    lockedAnswer: number,
    lockedGuess: number,
}

export interface GameState{
    status: 'notstarted' | 'started' | 'finished',
    players: { [key: string]: PlayerState }
} 