import { Crosshair2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

export default function() {
    let location = useLocation();
    const isTargetRoute = location.pathname.includes('target')
    const isSeekerRoute = location.pathname.includes('seeker')

    return (
        <div className="absolute bottom-0 left-0 w-full flex justify-between">
        <Link to="./seeker" relative="path">
            <Button variant={isSeekerRoute ? 'secondary' : 'outline'} size="icon">
              <Crosshair2Icon className="h-4 w-4 text-white" />
            </Button>
        </Link>
        <Link to="./target" relative="path">
            <Button variant={isTargetRoute ? 'secondary' : 'outline'} size="icon">
              <PersonIcon className="h-4 w-4 text-white" />
            </Button>
        </Link>
      </div>
    )
}