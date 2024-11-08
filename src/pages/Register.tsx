import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameConnection } from "@/lib/socket";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const socket = useGameConnection();
  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data)
        console.log(message)
        if (message.type === 'ok') {
          navigate('./info')
          return
        }
        else setShowAlert(true)
      })
    }
  }, [socket])
  

  const sendName = () => {
    if(!name || !socket) return
    socket.send(
      JSON.stringify({
        type: 'register',
        data: { name }
      })
    )
  }
  
  return (
    <>
      <div className="flex flex-col gap-3">  
          <Input type="text" placeholder="Your actual name" value={name} onChange={e => setName(e.target.value)}></Input>
          {name && <Button onClick={sendName}>Begin</Button>}
      </div>
      {showAlert && <Alert variant="destructive">
          <TriangleAlert></TriangleAlert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong, please reload and try again</AlertDescription>
      </Alert>}
    </>
  )
}