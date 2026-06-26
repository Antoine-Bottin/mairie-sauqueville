import { list } from "@vercel/blob";
import { notFound } from "next/navigation";
import PdfCard from "@/app/components/PdfCard/PdfCard";
import { getDocumentCategory } from "@/app/documents/documentsConfig";

import "./styles.scss";

export const dynamic = "force-dynamic";

interface DocumentMunicipal {
  url: string;
  pathname: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const category = getDocumentCategory(slug);

  if (!category) notFound();

  const { blobs } = await list({ prefix: category.blobPrefix });

  const cleanPdfList = blobs.filter(
    (doc) =>
      doc.pathname !== category.blobPrefix && doc.pathname.endsWith(".pdf"),
  );

  return (
    <div className="documents-page">
      <div className="documents-page__header">
        <h1 className="documents-page__title">{category.title}</h1>
        <p className="documents-page__subtitle">{category.subtitle}</p>
      </div>

      <div className="documents-page__grid">
        {cleanPdfList.length === 0 ? (
          <p className="documents-page__empty">
            Aucun document disponible pour le moment.
          </p>
        ) : (
          cleanPdfList.map((doc: DocumentMunicipal) => (
            <PdfCard
              key={doc.url}
              url={doc.url}
              pathname={doc.pathname}
              blobSlug={category.blobPrefix}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
