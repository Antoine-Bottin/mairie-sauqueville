import "./styles.scss";

const Page = () => {
  return (
    <div className="mentions">
      <header className="mentions__header">
        <h1>Mentions Légales</h1>
      </header>

      <section className="mentions__section">
        <h2 className="mentions__subtitle">1. Éditeur du site</h2>
        <p>
          Le site <strong>www.sauqueville.fr</strong> est édité par la Mairie de
          Sauqueville.
        </p>
        <ul className="mentions__list">
          <li>
            <strong>Adresse :</strong> 267, rue de la Mairie, 76550 Sauqueville
          </li>
          <li>
            <strong>Directeur de la publication :</strong> Mr Grenon Denis,
            Maire de Sauqueville
          </li>
          <li>
            <strong>SIRET :</strong> 21760667200012
          </li>
          <li>
            <strong>Téléphone :</strong> 02 35 85 43 60
          </li>
          <li>
            <strong>E-mail :</strong> contact@sauqueville.fr
          </li>
        </ul>
      </section>

      <section className="mentions__section">
        <h2 className="mentions__subtitle">2. Hébergement</h2>
        <p>Le site est hébergé par la société Vercel Inc.</p>
        <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
      </section>

      <section className="mentions__section">
        <h2 className="mentions__subtitle">3. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble de ce site relève de la législation française et
          internationale sur le droit d&apos;auteur et la propriété
          intellectuelle. Tous les droits de reproduction sont réservés, y
          compris pour les documents téléchargeables.
        </p>
      </section>
      <section className="mentions__section">
        <h2 className="mentions__subtitle">4. Données personnelles</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), les informations recueillies via les e-mails sont traitées
          exclusivement pour répondre à vos demandes. Aucune donnée personnelle
          n&apos;est cédée à des tiers. Vous disposez d&apos;un droit
          d&apos;accès, de rectification et de suppression des données vous
          concernant en nous contactant à{" "}
          <strong>contact@sauqueville.fr</strong>.
        </p>
      </section>

      <section className="mentions__section">
        <h2 className="mentions__subtitle">5. Cookies</h2>
        <p>
          Le site utilise uniquement des cookies techniques nécessaires à son
          bon fonctionnement ainsi qu&apos;un outil de mesure d&apos;audience
          (Vercel Analytics) configuré pour respecter la vie privée des
          utilisateurs conformément aux recommandations de la CNIL. Aucune
          donnée personnelle n&apos;est utilisée à des fins publicitaires.
        </p>
      </section>
      <section className="mentions__section">
        <h2 className="mentions__subtitle">6. Crédits et développement</h2>
        <p>
          Ce site est une réalisation de <strong>BOTTIN Antoine</strong>. Pour
          toute demande de développement web ou d&apos;automatisation, retrouvez
          mes services sur{" "}
          <a
            href="https://www.portfolio.abottin.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            mon portfolio en ligne
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Page;
