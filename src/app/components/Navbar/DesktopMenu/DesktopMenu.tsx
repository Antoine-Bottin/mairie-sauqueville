import { NavItem } from "../navigationLinks";

import "./styles.scss";

interface DesktopMenuProps {
  links: NavItem[];
}

const DesktopMenu = ({ links }: DesktopMenuProps) => {
  return (
    <ul className="desktop-menu-list">
      {links.map((link, index) => (
        <li key={index} className="desktop-menu-item">
          {link.subMenu ? (
            // Si on a un sous-menu, on met un bouton ou un span (pas de lien direct)
            <>
              <span className="desktop-menu-link has-submenu">
                {link.label} <span className="arrow">▾</span>
              </span>
              <ul className="desktop-submenu">
                {link.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a href={subItem.href}>{subItem.label}</a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            // Si c'est un lien simple
            <a href={link.href} className="desktop-menu-link">
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;
