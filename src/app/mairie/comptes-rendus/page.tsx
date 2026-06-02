import "./styles.scss";

import { list } from "@vercel/blob";

interface DocumentMunicipal {
  url: string;
  pathname: string;
}

const Page = async () => {
  const { blobs } = await list({ prefix: "conseil-municipal/" });

  const cleanPdfList = blobs.filter(
    (doc) =>
      doc.pathname !== "conseil-municipal/" && doc.pathname.endsWith(".pdf"),
  );
  return (
    <main className="comptes-rendus-page">
      <h1>Comptes rendus des conseils municipaux</h1>

      <ul className="comptes-rendus-page__list">
        {cleanPdfList.map((doc: DocumentMunicipal) => {
          const cleanName = doc.pathname
            .replace("comptes-rendus/", "")
            .replace(".pdf", "")
            .replaceAll("-", " ");

          return (
            <li key={doc.url} className="comptes-rendus-page__item">
              <span className="comptes-rendus-page__doc-name">{cleanName}</span>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="comptes-rendus-page__link"
              >
                Ouvrir le document
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Page;
