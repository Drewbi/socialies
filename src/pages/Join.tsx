import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Join() {
  const [code, setCode] = useState('');

  return (
    <>
      <Input type="text" placeholder="Room Code" value={code} onChange={e => setCode(e.target.value)} />
      {code && <Button variant="outline" className="text-white" asChild><Link to={code}>Enter</Link></Button>}
    </>
  )
}