import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Seeker() {
  const [answer, setAnswer] = useState("");

  return (
    <>
      <h1>Gregory</h1>
      <blockquote className="mb-10">
          How many children could you fight
      </blockquote>
      <Input type="text" placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
      <Button>Submit</Button>
    </>
  )
}