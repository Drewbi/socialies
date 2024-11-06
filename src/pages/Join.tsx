import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [code, setCode] = useState('')

  const navigate = useNavigate()
  const sendCode = () => {
    navigate(`./${code}`)
  }
  return (
    <>
      <div className="flex flex-col gap-3">  
          <Input type="text" placeholder="Room Code" value={code} onChange={e => setCode(e.target.value)} />
          {code && <Button onClick={sendCode}>Begin</Button>}
      </div>
    </>
  )
}