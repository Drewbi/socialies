import ModeSelect from "@/components/ModeSelect";
import { Outlet } from "react-router-dom";

export default function Game() {
  return (
    <>
      <Outlet></Outlet>
      <ModeSelect></ModeSelect>
    </>
  )
}