import "./styles.scss";
import { list } from "@vercel/blob";
import PdfCard from "@/app/components/PdfCard/PdfCard";

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
    <div className="comptes-rendus-page">
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
          return (
            <PdfCard
              key={doc.url}
              url={doc.url}
              pathname={doc.pathname}
              blobSlug="conseil-municipal/"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
