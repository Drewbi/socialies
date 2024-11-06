import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Seeker() {
  const [answer, setAnswer] = useState("");
  
  return (
    <>
      <div className="text-center">
        <p className="text-gray-400">Target</p>
        <h1 className="">Gregory</h1>
      </div>
      <blockquote className="m-10 text-2xl">
          How many children could you fight
      </blockquote>
      <div className="flex flex-col gap-2">
      <Input type="text" placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
      <Button>Submit</Button>
      </div>
    </>
  )
}