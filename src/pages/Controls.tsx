import ModeSelect from "@/components/ModeSelect";
import { Outlet } from "react-router-dom";

export default function MenuLayout() {
    return (
      <>
        <Outlet></Outlet>
        <ModeSelect></ModeSelect>
      </>
    )
}