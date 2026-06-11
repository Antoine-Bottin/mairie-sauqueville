import ContactCard from "../components/ContactCard/ContactCard";
import { MdAlternateEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

import { FaPhone } from "react-icons/fa";
import "./styles.scss";

const Page = () => {
  return (
    <section className="contact-grid">
      <ContactCard
        href="mailto:contact@sauqueville.fr"
        title="Par E-mail"
        content="contact@sauqueville.fr"
        icon={<MdAlternateEmail />}
      />

      <ContactCard
        href="tel:+332XXXXXXXX"
        title="Par Téléphone"
        content="02 35 85 43 60"
        icon={<FaPhone />}
      />

      <ContactCard
        title="Accueil physique"
        content="267, rue de la Mairie 76550 Sauqueville, aux heures d'ouverture de la Mairie"
        icon={<FaMapMarkerAlt />}
      />
    </section>
  );
};

export default Page;
