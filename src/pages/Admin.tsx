import { Button } from "@/components/ui/button";
import usePartySocket from "partysocket/react";
import { useParams } from "react-router-dom";

export default function Admin() {
  const { roomId } = useParams()
  const socket = usePartySocket({
    room: roomId
  });
  
  const startGame = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: 'start',
        })
      )
    } 
  }

  return (
    <>
      <div>Admin</div>
      <Button onClick={startGame}>Start Game</Button>
    </>
  )
}