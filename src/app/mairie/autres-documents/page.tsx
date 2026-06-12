import { list } from "@vercel/blob";
import PdfCard from "@/app/components/PdfCard/PdfCard";

import "./styles.scss";

interface DocumentMunicipal {
  url: string;
  pathname: string;
}

const Page = async () => {
  const { blobs } = await list({
    prefix: "autres-documents/",
  });

  const cleanPdfList = blobs.filter(
    (doc) =>
      doc.pathname !== "autres-documents/" && doc.pathname.endsWith(".pdf"),
  );

  return (
    <main className="autres-documents-page">
      <div className="autres-documents-page__header">
        <h1 className="autres-documents-page__title">Autres documents</h1>
        <p className="autres-documents-page__subtitle">
          Retrouvez ici des documents utiles.
        </p>
      </div>

      <div className="autres-documents-page__grid">
        {cleanPdfList.map((doc: DocumentMunicipal) => {
          return (
            <PdfCard
              key={doc.url}
              url={doc.url}
              pathname={doc.pathname}
              blobSlug="autres-documents/"
            />
          );
        })}
      </div>
    </main>
  );
};

export default Page;
