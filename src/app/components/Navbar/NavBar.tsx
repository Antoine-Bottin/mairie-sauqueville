// Navbar.tsx
import Image from "next/image";

import DesktopMenu from "./DesktopMenu/DesktopMenu";
import MobileMenu from "./MobileMenu/MobileMenu";
import { navigationLinks } from "./navigationLinks";

import "./styles.scss";

export default function Navbar() {
  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Image
            src="/assets/logo-mairie-black.svg"
            alt="Blason de la mairie"
            width="50"
            height="50"
          />
          Mairie de Sauqueville
        </div>
        <DesktopMenu links={navigationLinks} />
        <MobileMenu links={navigationLinks} />
      </div>
    </nav>
  );
}
