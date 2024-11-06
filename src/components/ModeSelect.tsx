import { Crosshair, ShieldQuestion } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function() {
    let location = useLocation();
    const isTargetRoute = location.pathname.includes('target')
    const isSeekerRoute = location.pathname.includes('seeker')

    return (
        <div className="absolute bottom-0 left-0 w-full flex justify-between">
        <Link to="./seeker" relative="path" className={`w-24 h-24 flex justify-center items-center border-2 border-white rounded-tr-3xl ${isSeekerRoute ? 'bg-white text-secondary' : ''}`}>
            <Crosshair className="h-8 w-8" />
        </Link>
        <Link to="./target" relative="path" className={`w-24 h-24 flex justify-center items-center border-2 border-white rounded-tl-3xl ${isTargetRoute ? 'bg-white text-secondary' : ''}`}>
            <ShieldQuestion className="h-8 w-8" />
        </Link>
      </div>
    )
}