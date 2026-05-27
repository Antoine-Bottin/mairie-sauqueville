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
      { label: "Démarches administratives", href: "/mairie/demarches" },
    ],
  },
  { label: "Vie locale", href: "/vie-locale" },
  { label: "Contact", href: "/contact" },
];
