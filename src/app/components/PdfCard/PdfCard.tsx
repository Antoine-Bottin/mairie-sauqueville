import Button from "../Button/Button";

import "./styles.scss";

interface DocumentMunicipal {
  url: string;
  pathname: string;
  blobSlug: string;
}

const PdfCard = (doc: DocumentMunicipal) => {

  const cleanName = doc.pathname
    .replace(`${doc.blobSlug}`, "")
    .replace(".pdf", "")
    .replaceAll("-", " ");

  return (
    <article key={doc.url} className="cr-card">
      <div className="cr-card__preview" aria-hidden="true">
        <div className="cr-card__document-skeleton">
          <div className="cr-card__line cr-card__line--short"></div>
          <div className="cr-card__line"></div>
          <div className="cr-card__line"></div>
          <div className="cr-card__badge">PDF</div>
        </div>
      </div>

      <div className="cr-card__content">
        <h2 className="cr-card__title">{cleanName}</h2>

        <Button href={doc.url} target="_blank" rel="noopener noreferrer">
          Ouvrir le documents
        </Button>
      </div>
    </article>
  );
};

export default PdfCard;
