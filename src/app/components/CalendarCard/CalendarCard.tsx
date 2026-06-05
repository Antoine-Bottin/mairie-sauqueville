import { EvenementMunicipal } from "@/sanity/lib/queries";

import "./styles.scss";

interface CalendarCardProps {
  event: EvenementMunicipal;
  dateFormatee: string;
}

const CalendarCard = ({ event, dateFormatee }: CalendarCardProps) => {
  return (
    <article
      className={`event-simple-card event-simple-card--${event.categorie}`}
    >
      <div className="event-simple-card__content">
        <div className="event-simple-card__header">
          <span className="event-simple-card__badge">{event.categorie}</span>
          <span className="event-simple-card__date">{dateFormatee}</span>
        </div>

        <h3 className="event-simple-card__card-title">{event.title}</h3>
        {event.description && (
          <p className="event-simple-card__desc">{event.description}</p>
        )}
        <span className="event-simple-card__lieu">📍 {event.lieu}</span>
      </div>
    </article>
  );
};

export default CalendarCard;
