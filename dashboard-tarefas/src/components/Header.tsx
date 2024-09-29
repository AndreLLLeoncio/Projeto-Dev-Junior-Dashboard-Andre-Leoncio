import { useState } from "react";
import { SiGoogletasks } from "react-icons/si";
import Image from "next/image";
import { MdOutlineMenu } from "react-icons/md";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IoIosLogOut } from "react-icons/io";
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="md:w-[98%] w-[94%] h-[80%] bg-zinc-700 mx-auto rounded-2xl flex flex-row items-center">
        
        <div className="flex h-full flex-row mr-auto ml-7 items-center space-x-3 text-2xl text-white">
          <SiGoogletasks />
          <p>TaskFlow</p>
        </div>

        <div className="mr-5 lg:flex h-full flex-row hidden items-center space-x-3">
          <Image src="/user-img.png" alt="User Image" width={60} height={60} />
          <a href="/login"><IoIosLogOut className="size-10 text-white" /></a>
        </div>

        <div className="mr-5 lg:hidden h-full flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button onClick={() => setOpen(!open)}>
                <MdOutlineMenu className="text-white size-10" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="/dashboard">Dashboard</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/login">Sair</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      
      </div>
    </div>
  );
}
