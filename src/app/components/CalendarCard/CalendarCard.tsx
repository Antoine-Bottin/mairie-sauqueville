import { EvenementMunicipal } from "@/sanity/lib/queries";
import { formatEventDate } from "@/app/utils";
import PhotoCard from "../PhotoCard/PhotoCard";
import ReadMore from "../ReadMore/ReadMore";

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
        <PhotoCard
          url={event.image}
          cleanTitle={event.title}
          customWrapperClass="event-simple-card__image-wrapper"
          customImageClass="event-simple-card__image"
          hideCaption={true}
        />
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
          <ReadMore
            title={event.title}
            text={event.description}
            lines={4}
            textClassName="event-simple-card__desc"
            meta={
              <>
                <span className="event-simple-card__badge">
                  {event.categorie}
                </span>
                <span className="event-simple-card__date">
                  {formatEventDate(date)}
                </span>
              </>
            }
          />
        )}
        <span className="event-simple-card__lieu">
          <span aria-hidden="true">📍</span>{" "}
          <span className="sr-only">Lieu : </span>
          {event.lieu}
        </span>
      </div>
    </article>
  );
};

export default CalendarCard;
