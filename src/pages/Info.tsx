import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function() {
    return (
        <>
            <div>info</div>
            <Button variant="outline" className="text-white" asChild><Link to="./seeker">Begin</Link></Button>
        </>
    )
}