import Link from "next/link";
import "./styles.scss";

interface PlanDuSiteSection {
  titre: string;
  liens: { label: string; href: string }[];
}

const SECTIONS: PlanDuSiteSection[] = [
  {
    titre: "Accueil",
    liens: [{ label: "Accueil", href: "/" }],
  },
  {
    titre: "Mairie",
    liens: [{ label: "Le Conseil Municipal", href: "/mairie/conseil" }],
  },
  {
    titre: "Documents",
    liens: [
      {
        label: "Comptes-rendus du conseil municipal",
        href: "/documents/comptes-rendus",
      },
      { label: "Documents d'urbanisme", href: "/documents/urbanisme" },
      { label: "Documents du SIVOS", href: "/documents/sivos" },
      { label: "Autres documents", href: "/documents/autres-documents" },
    ],
  },
  {
    titre: "Sauqueville",
    liens: [
      { label: "Sauqueville d'avant", href: "/sauqueville/avant" },
      { label: "Sauqueville en chiffres", href: "/sauqueville/chiffres" },
    ],
  },
  {
    titre: "Contact",
    liens: [{ label: "Nous contacter", href: "/contact" }],
  },
  {
    titre: "Informations légales",
    liens: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité (RGPD)", href: "/confidentialite" },
      { label: "Accessibilité", href: "/accessibilite" },
    ],
  },
];

const Page = () => {
  return (
    <div className="plan-du-site">
      <header className="plan-du-site__header">
        <h1>Plan du site</h1>
      </header>
      <p className="plan-du-site__intro">
        Retrouvez ici l&apos;ensemble des pages du site de la Mairie de
        Sauqueville.
      </p>
      {SECTIONS.map((section) => (
        <section key={section.titre} className="plan-du-site__section">
          <h2 className="plan-du-site__subtitle">{section.titre}</h2>
          <ul className="plan-du-site__links">
            {section.liens.map((lien) => (
              <li key={lien.href}>
                <Link href={lien.href}>{lien.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Page;
