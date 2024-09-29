import { SiGoogletasks } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaMoon } from "react-icons/fa";

export default function Header() {
  return (
    <div className="w-full h-[12%] flex items-center justify-center">
      <div className="w-[98%] h-[80%] bg-zinc-700 mx-auto rounded-2xl flex flex-row items-center">
        
        <div className="flex h-full flex-row mr-auto ml-7 items-center space-x-3 text-2xl text-white">
          <SiGoogletasks />
          <p>TaskFlow</p>
        </div>

        <div className="mr-5 flex h-full flex-row items-center space-x-3">
          <FaMoon className="size-6 text-white" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      
      </div>
    </div>
  );
}
