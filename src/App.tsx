import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

export default function() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-full h-full p-10 flex flex-col items-center justify-center gap-3">
        <Outlet></Outlet>
      </main>
    </ThemeProvider>
  );   
}