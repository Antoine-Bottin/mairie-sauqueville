import Image from "next/image";
import { EvenementMunicipal } from "@/sanity/lib/queries";
import { formatEventDate } from "@/app/utils";

import "./styles.scss";

interface CalendarCardProps {
  event: EvenementMunicipal;
  date: string;
  isSingle: boolean;
}

const CalendarCard = ({ event, date, isSingle }: CalendarCardProps) => {
  return (
    <article
      className={`event-simple-card event-simple-card--${event.categorie} ${
        isSingle ? "event-simple-card--single" : ""
      }`}
    >
      {event.image && (
        <div className="event-simple-card__image-wrapper">
          <Image
            src={event.image}
            alt={`Illustration pour ${event.title}`}
            fill
            className="event-simple-card__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="event-simple-card__content">
        <div className="event-simple-card__header">
          <span className="event-simple-card__badge">{event.categorie}</span>
          <span className="event-simple-card__date">
            {formatEventDate(date)}
          </span>
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
