import "./styles.scss";

const Page = () => {
  return (
    <div className="politique">
      <header className="politique__header">
        <h1>Politique de confidentialité</h1>
      </header>

      <section className="politique__section">
        <h2 className="politique__subtitle">1. Engagement de la Mairie</h2>
        <p>
          La Mairie de Sauqueville s&apos;engage à protéger la vie privée des
          usagers de son site internet, conformément au Règlement Général sur la
          Protection des Données (RGPD).
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">2. Données collectées</h2>
        <p>
          Nous ne collectons que les informations strictement nécessaires au
          traitement de vos demandes (nom, prénom, e-mail, téléphone, contenu de
          votre message). Ces données sont transmises directement à nos services
          par e-mail et ne sont jamais stockées dans une base de données tierce.
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">
          3. Données techniques et prestataires
        </h2>
        <p>
          Pour afficher le site, la Mairie fait appel à des prestataires
          techniques :
        </p>
        <ul className="politique__list">
          <li>
            <strong>Vercel Inc.</strong> : hébergement du site, stockage de
            certains documents (PDF) et mesure d&apos;audience (Vercel
            Analytics), sans cookie publicitaire ;
          </li>
          <li>
            <strong>Sanity AS</strong> : gestion et diffusion des contenus du
            site (textes, images et documents).
          </li>
        </ul>
        <p>
          Lors de votre navigation, votre adresse IP est transmise à ces
          prestataires afin de permettre l&apos;affichage des pages, des images
          et des documents, et d&apos;en assurer la sécurité. Ces prestataires
          agissent pour le compte de la Mairie. Certains peuvent traiter des
          données en dehors de l&apos;Union européenne ; ces transferts sont
          encadrés par les mécanismes prévus par le RGPD.
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">
          4. Finalité et durée de conservation
        </h2>
        <p>
          Ces données sont utilisées uniquement pour répondre à vos
          sollicitations. Elles sont conservées pendant la durée nécessaire au
          traitement administratif de votre demande, conformément aux
          obligations légales de conservation des archives publiques.
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">5. Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification et
          d&apos;effacement de vos données. Pour toute demande, contactez-nous à
          : <strong>contact@sauqueville.fr</strong>.
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">6. Sécurité</h2>
        <p>
          La Mairie met en œuvre des mesures techniques appropriées pour
          garantir la sécurité et la confidentialité de vos échanges.
        </p>
      </section>
    </div>
  );
};

export default Page;
