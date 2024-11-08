import { Button } from "@/components/ui/button";
import { useGameConnection } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function() {
    const [canStart, setCanStart] = useState(false)
    const navigate = useNavigate()
    const socket = useGameConnection()

    useEffect(() => {
        if (socket) {
          socket.addEventListener('message', ({ data }) => {
            const message = JSON.parse(data)
            if (message.type === 'needregister') {
              navigate('..')
            } else if (message.type === 'start') {
                setCanStart(true)
            }
          })

          socket.send(
            JSON.stringify({
              type: 'canstart',
            }
          ))
        }
      }, [socket])

    return (
        <>
            info
            {canStart 
                ? <Button onClick={() => navigate('../seeker')}>Start</Button>
                : <div className="text-xs text-gray-500">Waiting for game start...</div>
            }   
        </>
    )
}