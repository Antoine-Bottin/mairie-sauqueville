import "./styles.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Bloc 1 : Identité de la commune */}
        <div className="footer__block footer__block--identity">
          <h3 className="footer__commune-name">Mairie de Sauqueville</h3>
          <p className="footer__address">
            267, rue de la Mairie
            <br />
            76550 Sauqueville
          </p>
          <p className="footer__contact-info">
            Téléphone : 02 35 85 43 60
            <br />
            Email : contact@sauqueville.fr
          </p>
        </div>

        {/* Bloc 2 : Horaires d'ouverture */}
        <div className="footer__block">
          <h4 className="footer__block-title">Horaires du secrétariat</h4>
          <ul className="footer__hours-list">
            <li>Lundi : 17h00 - 19h00</li>
            <li>Vendredi : 16h00 - 18h00</li>
          </ul>
        </div>

        {/* Bloc 3 : Liens utiles & Navigation */}
        <div className="footer__block">
          <h4 className="footer__block-title">Services en ligne</h4>
          <ul className="footer__links-list">
            <li>
              <Link href="/sauqueville/actu">Actualités</Link>
            </li>

            <li>
              <Link href="/contact">Nous contacter</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre tout en bas : Obligations Légales et Copyright */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p className="footer__copyright">
            &copy; 2026 Mairie de Sauqueville. Tous droits réservés.
          </p>

          {/* LIENS LÉGAUX OBLIGATOIRES */}
          <div className="footer__legal-links">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-de-confidentialite">
              Confidentialité (RGPD)
            </Link>
            <Link href="/accessibilite">Accessibilité : non conforme</Link>
            <Link href="/plan-du-site">Plan du site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
