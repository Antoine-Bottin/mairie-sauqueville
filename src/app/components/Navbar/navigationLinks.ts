// types/navigation.ts
export interface NavItem {
  label: string;
  href?: string;
  subMenu?: { label: string; href: string }[];
}

export const navigationLinks: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Mairie",
    subMenu: [
      { label: "Le Conseil Municipal", href: "/mairie/conseil" },
      { label: "Comptes-rendus", href: "/mairie/comptes-rendus" },
    ],
  },
  {
    label: "Vie locale",
    href: "/vie-locale",
    subMenu: [
      { label: "Associations", href: "/vie-locale/associations" },
      { label: "Evenements", href: "/vie-locale/evenements" },
    ],
  },
  {
    label: "Sauqueville",
    href: "/sauqueville",
    subMenu: [
      { label: "D'avant", href: "/sauqueville/avant" },
      { label: "En chiffres", href: "/sauqueville/chiffres" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
