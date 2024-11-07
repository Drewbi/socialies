import { GameConnectionProvider } from "@/lib/socket";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

export default function Game() {
  const { roomId } = useParams();
  const [ userId, setUserId ] = useState<string>();
  useEffect(() => {
    let id = sessionStorage.getItem('userId')
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem('userId', id)
    }
    setUserId(id)
  }, [])

  return (
    <>
      {roomId && userId && 
      <GameConnectionProvider
        userId={userId}
        roomId={roomId}
      >
        <Outlet></Outlet>
      </GameConnectionProvider>}
    </>
  )
}