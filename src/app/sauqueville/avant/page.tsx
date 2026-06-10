// app/sauqueville/avant/page.tsx
import { list } from "@vercel/blob";
import "./styles.scss";
import PhotoCard from "@/app/components/PhotoCard/PhotoCard";

export const dynamic = "force-dynamic";

const Page = async () => {
  const response = await list({
    prefix: "old-sauqueville/",
  });

  const photos = response.blobs.filter((blob) =>
    /\.(webp|jpg|jpeg|png)$/i.test(blob.pathname),
  );

  return (
    <main className="gallery-page">
      <header className="gallery-page__header">
        <h1 className="gallery-page__title">Sauqueville avant</h1>
      </header>

      {photos.length === 0 ? (
        <p className="gallery-page__empty">Aucune photo trouvée.</p>
      ) : (
        <div className="gallery-page__masonry">
          {photos.map((photo, index) => {
            const fileName = photo.pathname.split("/").pop() || "";
            const cleanTitle = fileName
              .replace(/\.[^/.]+$/, "")
              .replace(/-/g, " ");

            let sizeClass = "";
            if (index % 5 === 0) sizeClass = "gallery-page__card--large";
            else if (index % 3 === 0) sizeClass = "gallery-page__card--wide";
            else if (index % 4 === 0) sizeClass = "gallery-page__card--tall";

            return (
              <PhotoCard
                key={photo.url}
                url={photo.url}
                cleanTitle={cleanTitle}
                sizeClass={sizeClass}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};
export default Page;
