'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem} from "@/Components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";



function Navbar({ className }: { className?: string }) {


  const [active, setActive] = useState<string | null>(null);


  return (
    <div   className={cn("fixed top-10 inset-x-0 max-w-5xl mx-auto z-50", className)}>
     <Menu setActive={setActive}>
      <Link href="/">
      <MenuItem setActive={setActive} active={active} item="Home" >
      Home
      </MenuItem>
      </Link>
      <MenuItem setActive={setActive} active={active} item="Blogs">
      <div className="flex flex-col space-y-6 text-sm">
            <HoveredLink href="/CreatePost">Create Blog</HoveredLink>
            <HoveredLink href="/ViewList">View Blog</HoveredLink>
           
          </div>
      </MenuItem>
      <Link href="/Contact">
      <MenuItem   setActive={setActive} active={active} item="Contact Us">
      
        </MenuItem>
        </Link>
     </Menu>
    </div>
  )
}

export default Navbar;


