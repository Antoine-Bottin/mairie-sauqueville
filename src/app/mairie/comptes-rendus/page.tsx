import Button from "@/app/components/Button/Button";
import "./styles.scss";
import { list } from "@vercel/blob";

interface DocumentMunicipal {
  url: string;
  pathname: string;
}

const Page = async () => {
  const { blobs } = await list({
    prefix: "conseil-municipal/",
  });

  const cleanPdfList = blobs.filter(
    (doc) =>
      doc.pathname !== "conseil-municipal/" && doc.pathname.endsWith(".pdf"),
  );

  return (
    <main className="comptes-rendus-page">
      <div className="comptes-rendus-page__header">
        <h1 className="comptes-rendus-page__title">
          Comptes rendus des conseils municipaux
        </h1>
        <p className="comptes-rendus-page__subtitle">
          Retrouvez l&apos;historique des décisions et des délibérations de la
          commune.
        </p>
      </div>

      <div className="comptes-rendus-page__grid">
        {cleanPdfList.map((doc: DocumentMunicipal) => {
          const cleanName = doc.pathname
            .replace("conseil-municipal/", "")
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

                <Button
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ouvrir le documents
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default Page;
