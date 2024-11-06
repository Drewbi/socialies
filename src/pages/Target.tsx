import SeekerProfile from "@/components/SeekerProfile";
import { Button } from "@/components/ui/button";

export default function Target() {
  return (
    <>
      <div className="absolute top-48 flex flex-col gap-4">
        <SeekerProfile name="Brenge"></SeekerProfile>
        <Button>Lock In</Button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10">
        <SeekerProfile name="Gregory"></SeekerProfile>
        <SeekerProfile name="Gregory"></SeekerProfile>
        <SeekerProfile name="Gregory"></SeekerProfile>
        <SeekerProfile name="Gregory"></SeekerProfile>
        <SeekerProfile name="Gregory"></SeekerProfile>
        <SeekerProfile name="Gregory"></SeekerProfile>
        <SeekerProfile name="Gregory"></SeekerProfile>
      </div>
    </>
  )
}