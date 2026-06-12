import { list } from "@vercel/blob";
import PdfCard from "@/app/components/PdfCard/PdfCard";

import "./styles.scss";

interface DocumentMunicipal {
  url: string;
  pathname: string;
}

const Page = async () => {
  const { blobs } = await list({
    prefix: "urbanisme/",
  });

  const cleanPdfList = blobs.filter(
    (doc) => doc.pathname !== "urbanisme/" && doc.pathname.endsWith(".pdf"),
  );

  return (
    <main className="urbanisme-page">
      <div className="urbanisme-page__header">
        <h1 className="urbanisme-page__title">Documents d&apos;urbanisme</h1>
        <p className="urbanisme-page__subtitle">
          Retrouvez ici vos documents d&apos;urbanisme.
        </p>
      </div>

      <div className="urbanisme-page__grid">
        {cleanPdfList.map((doc: DocumentMunicipal) => {
          return (
            <PdfCard
              key={doc.url}
              url={doc.url}
              pathname={doc.pathname}
              blobSlug="urbanisme/"
            />
          );
        })}
      </div>
    </main>
  );
};

export default Page;
