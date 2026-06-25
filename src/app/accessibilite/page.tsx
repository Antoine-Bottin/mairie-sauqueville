import "./styles.scss";

const Page = () => {
  return (
    <div className="accessibilite">
      <header className="accessibilite__header">
        <h1>Accessibilité du site</h1>
      </header>
      <section className="accessibilite__section">
        <p className="accessibilite__intro">
          Le site de la Mairie de Sauqueville est conçu pour répondre aux
          meilleurs standards du web. Nous effectuons régulièrement des audits
          techniques afin d&apos;optimiser l&apos;accessibilité de nos pages
          pour tous les utilisateurs.
        </p>
      </section>
      <section className="accessibilite__section">
        <h2 className="accessibilite__subtitle">Déclaration de conformité</h2>
        <p>
          La Mairie de Sauqueville s&apos;engage à rendre son site internet
          accessible, conformément à l&apos;article 47 de la loi n° 2005-102 du
          11 février 2005.
        </p>
        <p>
          À ce jour, le site est en phase de développement. Nous déclarons le
          site comme étant <strong> partiellement conforme </strong> aux règles
          générales d&apos;accessibilité (RGAA).
        </p>
      </section>

      <section className="accessibilite__section">
        <h2 className="accessibilite__subtitle">Amélioration continue</h2>
        <p>
          Nous travaillons activement à l&apos;amélioration de
          l&apos;accessibilité de nos contenus (balisage sémantique, contrastes
          de couleurs, navigation au clavier, compatibilité avec les lecteurs
          d&apos;écran).
        </p>
      </section>

      <section className="accessibilite__section">
        <h2 className="accessibilite__subtitle">
          Retour d&apos;information et contact
        </h2>
        <p>
          Si vous n&apos;arrivez pas à accéder à un contenu ou à une
          fonctionnalité, vous pouvez nous contacter pour être orienté vers une
          alternative accessible ou obtenir le contenu sous une autre forme.
        </p>
        <p>
          E-mail : <strong>contact@sauqueville.fr</strong>
        </p>
      </section>
    </div>
  );
};
export default Page;
