import usePartySocket from "partysocket/react";
import { Outlet, useParams } from "react-router-dom";

export default function Game() {
  const {roomId} = useParams()
  const socket = usePartySocket({
    room: roomId,
    onOpen: () => {
      console.log('Opened')
    }
  })
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}