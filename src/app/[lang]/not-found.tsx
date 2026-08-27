import BaseContainer from "@/components/global/base-container/BaseContainer";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <BaseContainer>
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h2 className="text-lg">Not Found. 😒</h2>
        <p className="text-md">Could not find requested resource.</p>
        <div className="space-x-2">
          <Button variant={"outline"}>
            <HomeIcon /> <Link href={"/"}>Go Home</Link>{" "}
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
}
