import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function() {
    return (
        <>
            <div>infoo</div>
            <Button variant="outline" asChild><Link to="./seeker">Begin</Link></Button>
        </>
    )
}