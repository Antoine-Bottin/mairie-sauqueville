export interface SubNavItem {
  label: string;
  href: string;
  // Page pas encore créée : entrée grisée et non cliquable (retirer quand la page existe)
  disabled?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  subMenu?: SubNavItem[];
}

export const navigationLinks: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Mairie",
    subMenu: [
      { label: "Le Conseil Municipal", href: "/mairie/conseil" },
      {
        label: "Présentation de la commune",
        href: "/mairie/commune",
        disabled: true,
      },
    ],
  },
  {
    label: "Documents",
    subMenu: [
      {
        label: "Comptes-rendus du conseil municipal",
        href: "/documents/comptes-rendus",
      },
      {
        label: "Documents d'urbanisme",
        href: "/documents/urbanisme",
      },
      {
        label: "Documents du SIVOS",
        href: "/documents/sivos",
      },
      {
        label: "Autres documents",
        href: "/documents/autres-documents",
      },
    ],
  },
  {
    label: "Vie locale",
    href: "/vie-locale",
    subMenu: [{ label: "ASLS", href: "/vie-locale/asls", disabled: true }],
  },
  {
    label: "Sauqueville",
    href: "/sauqueville",
    subMenu: [
      { label: "Sauqueville d'avant", href: "/sauqueville/avant" },
      { label: "Sauqueville en chiffres", href: "/sauqueville/chiffres" },
      { label: "Nos artisans", href: "/sauqueville/artisans", disabled: true },
      {
        label: "Nos entreprises",
        href: "/sauqueville/entreprises",
        disabled: true,
      },
      { label: "Nos talents", href: "/sauqueville/talents", disabled: true },
    ],
  },
  { label: "Contact", href: "/contact" },
];
