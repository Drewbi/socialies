import type * as Party from "partykit/server";
import { handleAnswer, handleCanStart, handleGetSeekers, handleGetTarget, handleGuess, handleNewTarget, handleRegister, handleStart } from "./handlers";
import { GameState } from "./types";
import { decodeMessage, encodeMessage } from "./util";

declare const DEVMODE: boolean;

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  state: GameState = {
    status: 'notstarted',
    players: {}
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );
  }

  onMessage(message: string, sender: Party.Connection) {
    try {
      const data = decodeMessage(message)
      console.log('Received message from', sender.id)
      console.log('Message:', data)
      switch(data.type) {
        case 'register':
          handleRegister(this.state, sender, data)
          break
        case 'start':
          handleStart(this.state, this.room)
          break
        case 'canstart':
          handleCanStart(this.state, sender)
          break
        case 'target':
          handleGetTarget(this.state, sender)
          break
        case 'newtarget':
          handleNewTarget(this.state, sender)
          break
        case 'answer':
          handleAnswer(this.state, this.room, sender, data)
          break
        case 'seekers':
          handleGetSeekers(this.state, sender)
          break
        case 'guess':
          handleGuess(this.state, this.room, sender, data)
      }
    } catch (error) {
      console.error(error)
      sender.send(encodeMessage({ type: 'notok', data: {error}}))
    }
  }

  // Dev Proxy
  static async onFetch(request: Party.Request) {
    // when developing locally, we simply proxy all
    // non-party requests to the vite dev server
    if (DEVMODE) {
      const url = new URL(request.url);
      url.hostname = "localhost";
      url.port = "5173";
      return fetch(url.toString(), request as unknown as Request);
    }

    // You could also add additional api handlers here.

    return new Response("Not found", { status: 404 });
  }
}

Server satisfies Party.Worker;
