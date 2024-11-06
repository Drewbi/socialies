import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function() {
    const navigate = useNavigate()
    return (
        <>
            info
            <Button onClick={() => navigate('../seeker')}>Start</Button>       
        </>
    )
}