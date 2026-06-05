import Image from "next/image";
import Link from "next/link";

import DesktopMenu from "./DesktopMenu/DesktopMenu";
import MobileMenu from "./MobileMenu/MobileMenu";
import { navigationLinks } from "./navigationLinks";

import "./styles.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link
          href="/"
          className="navbar__logo-link"
          aria-label="Retour à l'accueil - Mairie de Sauqueville"
        >
          <Image
            src="/assets/logo-mairie-black.svg"
            alt="Blason de la commune de Sauqueville"
            width={50}
            height={50}
            priority
            className="navbar__logo-img"
          />
          <span className="navbar__logo-text">Mairie de Sauqueville</span>
        </Link>

        <DesktopMenu links={navigationLinks} />
        <MobileMenu links={navigationLinks} />
      </div>
    </nav>
  );
}
