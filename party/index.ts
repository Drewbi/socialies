import type * as Party from "partykit/server";

declare const DEVMODE: boolean;

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // let's send a message to the connection
    conn.send("hello from server");
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...
    this.room.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      [sender.id]
    );
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
