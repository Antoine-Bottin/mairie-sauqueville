"use client";

import { useState } from "react";
import { NavItem } from "../navigationLinks";

import "./styles.scss";

interface MobileMenuProps {
  links: NavItem[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Stocke l'index du sous-menu ouvert, ou null si tout est fermé
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null); // On referme si on reclique sur le même
    } else {
      setActiveSubMenu(index); // On ouvre le nouveau
    }
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  return (
    <div className="navbar-mobile">
      {/* Bouton Burger */}
      <button
        className={`burger-btn ${isOpen ? "is-active" : ""}`}
        onClick={() => (isOpen ? closeAll() : setIsOpen(true))}
        aria-label="Menu de navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay plein écran */}
      <div
        className={`mobile-overlay ${isOpen ? "is-open" : ""}`}
        inert={!isOpen}
      >
        <ul className="mobile-menu-list">
          {links.map((link, index) => {
            const hasSubMenu = !!link.subMenu;
            const isSubMenuOpen = activeSubMenu === index;
            const submenuId = `mobile-submenu-${index}`;

            return (
              <li key={index} className="mobile-menu-item">
                {hasSubMenu ? (
                  // Si sous-menu : bouton déclencheur
                  <>
                    <button
                      className={`mobile-menu-link has-submenu ${isSubMenuOpen ? "submenu-active" : ""}`}
                      onClick={() => toggleSubMenu(index)}
                      aria-expanded={isSubMenuOpen}
                      aria-controls={submenuId}
                    >
                      {link.label}
                      <span className="chevron" aria-hidden="true">
                        {isSubMenuOpen ? "▴" : "▾"}
                      </span>
                    </button>

                    {/* Liste imbriquée du sous-menu */}
                    <ul
                      id={submenuId}
                      className={`mobile-submenu ${isSubMenuOpen ? "is-expanded" : ""}`}
                    >
                      {link.subMenu!.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a href={subItem.href} onClick={closeAll}>
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  // Si lien simple : redirection classique
                  <a
                    href={link.href}
                    className="mobile-menu-link"
                    onClick={closeAll}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
