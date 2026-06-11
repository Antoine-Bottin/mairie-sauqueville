import "./styles.scss";

const Page = () => {
  return (
    <main className="politique">
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
          3. Finalité et durée de conservation
        </h2>
        <p>
          Ces données sont utilisées uniquement pour répondre à vos
          sollicitations. Elles sont conservées pendant la durée nécessaire au
          traitement administratif de votre demande, conformément aux
          obligations légales de conservation des archives publiques.
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">4. Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification et
          d&apos;effacement de vos données. Pour toute demande, contactez-nous à
          : <strong>contact@sauqueville.fr</strong>.
        </p>
      </section>

      <section className="politique__section">
        <h2 className="politique__subtitle">5. Sécurité</h2>
        <p>
          La Mairie met en œuvre des mesures techniques appropriées pour
          garantir la sécurité et la confidentialité de vos échanges.
        </p>
      </section>
    </main>
  );
};

export default Page;
