import SeekerProfile from "@/components/SeekerProfile";
import { Button } from "@/components/ui/button";
import { useGameConnection } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Target() {
  const [lockedGuessTime, setLockedGuessTime] = useState<number>(0)
  const [selectedSeeker, setSelectedSeeker] = useState<any>(null)
  const [seekers, setSeekers] = useState<any[]>([])
  const navigate = useNavigate()
  const socket = useGameConnection()

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data)
        if (message.type === 'seekers') {
          setSeekers(message.data.seekers)
        } else if (message.type === 'guesscorrect') {
          setSelectedSeeker(null)
        } else if (message.type === 'badguess') {
          setSelectedSeeker(null)
          setLockedGuessTime(message.data.guessTimeout - Date.now())
        } else if (message.type === 'needregister') {
          navigate('..')
        } else if (message.type === 'notstarted') {
          navigate('./info')
        }
      })

      if (!seekers.length) {
        socket.send(
          JSON.stringify({
            type: 'seekers',
          }
        ))
      }
    }
  }, [socket])

  useEffect(() => {
    if (lockedGuessTime > 0) {
      setTimeout(() => {
        setLockedGuessTime(lockedGuessTime - 50)
      }, 50)
    }
  }, [lockedGuessTime])

  const sendGuess = () => {
    if(!selectedSeeker || !socket) return
    socket.send(
      JSON.stringify({
        type: 'guess',
        data: { seeker: selectedSeeker.id }
      })
    )
  }

  return (
    <>
      <div className="absolute top-48 flex flex-col items-center gap-4">
        {selectedSeeker
          ? <SeekerProfile id={selectedSeeker.id} name={selectedSeeker.name} onClick={() => setSelectedSeeker(null)}></SeekerProfile>
          : <div className="border-2 border-white rounded-full w-24 h-24"></div>}
        {selectedSeeker && lockedGuessTime <= 0 && <Button onClick={sendGuess}>Lock In</Button>}
        {lockedGuessTime > 0 && <Button id="lock-guess-button" disabled>{lockedGuessTime / 1000}</Button>}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {seekers.map(seeker => {
          if (!selectedSeeker || seeker.id !== selectedSeeker.id) {
            return <SeekerProfile onClick={() => setSelectedSeeker(seeker)} id={seeker.id} name={seeker.name}></SeekerProfile>
          }
        })}
      </div>
    </>
  )
}