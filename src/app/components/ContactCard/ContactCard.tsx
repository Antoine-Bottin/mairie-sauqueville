import "./styles.scss";

interface ContactCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  href?: string;
  isHighlight?: boolean;
}

const ContactCard = ({
  title,
  content,
  icon,
  href,
  isHighlight = false,
}: ContactCardProps) => {
  const CardContainer = href ? "a" : "div";

  return (
    <CardContainer
      href={href}
      className={`contact-card ${isHighlight ? "contact-card--highlight" : ""}`}
    >
      <div className="contact-card__icon">{icon}</div>
      <h3 className="contact-card__title">{title}</h3>
      <p className="contact-card__content">{content}</p>
    </CardContainer>
  );
};

export default ContactCard;
