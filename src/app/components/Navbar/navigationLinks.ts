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
      {
        label: "Comptes-rendus du conseil municipal",
        href: "/mairie/comptes-rendus",
      },
      {
        label: "Documents d'urbanisme",
        href: "/mairie/urbanisme",
      },
      {
        label: "Autres documents",
        href: "/mairie/autres-documents",
      },
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
      { label: "Sauqueville d'avant", href: "/sauqueville/avant" },
      { label: "Sauqueville en chiffres", href: "/sauqueville/chiffres" },
      { label: "Nos artisans", href: "/sauqueville/artisans" },
      { label: "Nos entreprises", href: "/sauqueville/entreprises" },
      { label: "Nos talents", href: "/sauqueville/talents" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
