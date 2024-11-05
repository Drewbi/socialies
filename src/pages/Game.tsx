import ModeSelect from "@/components/ModeSelect";
import usePartySocket from "partysocket/react";
import { Outlet, useParams } from "react-router-dom";

export default function Game() {
  let { roomId } = useParams();
  const socket = usePartySocket({
    // host defaults to the current URL if not set
    //host: process.env.PARTYKIT_HOST,
    // we could use any room name here
    room: roomId,
    onMessage(evt) {
      console.log(evt)
    },
  });

  return (
    <>
      <Outlet></Outlet>
      <ModeSelect></ModeSelect>
    </>
  )
}