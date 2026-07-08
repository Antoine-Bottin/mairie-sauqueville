"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/NavBar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
