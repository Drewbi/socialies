import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameConnection } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Seeker() {
  const [name, setName] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('');
  const [lockedAnswerTime, setLockedAnswerTime] = useState<number>(0)
  const navigate = useNavigate()
  const socket = useGameConnection()
  
  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data)
        if (message.type === 'target' || message.type === 'newtarget') {
          setName(message.data.name)
          setQuestion(message.data.question)
          setAnswer('')
        } else if (message.type === 'answerpending') {
          setLockedAnswerTime(Math.ceil(message.data.answerTimeout - Date.now()))
          setInterval(() => {
              setLockedAnswerTime(val => val - 50)
          }, 50)
          
        } else if (message.type === 'answerconfirmed') {
          setLockedAnswerTime(0)
        } else if (message.type === 'needregister') {
          navigate('..')
        } else if (message.type === 'notstarted') {
          navigate('./info')
        }
      })

      if (!name || !question) {
        socket.send(
          JSON.stringify({
            type: 'target',
          }
        ))
      }
    }
  }, [socket])

  const sendAnswer = () => {
    if(!answer || !socket) return
    socket.send(
      JSON.stringify({
        type: 'answer',
        data: { answer }
      })
    )
  }

  return (
    <>
      <div className="text-center">
        <p className="text-gray-400">Target</p>
        <h1 className="">{ name }</h1>
      </div>
      <blockquote className="m-10 text-2xl">{ question }</blockquote>
      <div className="flex flex-col gap-2">
      <Input type="text" placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
      {answer && lockedAnswerTime <= 0 && <Button onClick={sendAnswer}>Submit</Button>}
      {lockedAnswerTime > 0 && <Button id="lock-answer-button" disabled>{lockedAnswerTime / 1000}</Button>}
      </div>
    </>
  )
}