import type * as Party from "partykit/server";
import { GameState, ResponseType } from "./types";
import { encodeMessage } from "./util";

export function handleRegister(state: GameState, sender: Party.Connection, data: any) {
    state[sender.id] = {
        name: data.name,
        target: null,
        points: 0
    } 

    sender.send(encodeMessage({
        type: 'ok'
    }))
}