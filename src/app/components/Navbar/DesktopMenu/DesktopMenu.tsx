"use client";

import { useState } from "react";
import { NavItem } from "../navigationLinks";

import "./styles.scss";

interface DesktopMenuProps {
  links: NavItem[];
}

const DesktopMenu = ({ links }: DesktopMenuProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="desktop-menu-list">
      {links.map((link, index) => {
        const isOpen = openIndex === index;

        return (
          <li
            key={index}
            className="desktop-menu-item"
            onMouseEnter={() => link.subMenu && setOpenIndex(index)}
            onMouseLeave={() => link.subMenu && setOpenIndex(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setOpenIndex(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpenIndex(null);
            }}
          >
            {link.subMenu ? (
              <>
                <button
                  type="button"
                  className="desktop-menu-link has-submenu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onFocus={() => setOpenIndex(index)}
                >
                  {link.label} <span aria-hidden="true">▾</span>
                </button>
                <ul className={`desktop-submenu ${isOpen ? "is-open" : ""}`}>
                  {link.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href={subItem.href}>{subItem.label}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a href={link.href} className="desktop-menu-link">
                {link.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;
