import { list } from "@vercel/blob";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import Hero from "./components/Hero/Hero";
import SmallCard from "./components/SmallCard/SmallCard";
import { smallCardContent } from "./homeContent";

import "./styles.scss";

const Page = async () => {
  const response = await list({ prefix: "old-sauqueville/" });
  const photos = response.blobs.filter((blob) =>
    /\.(webp|jpg|jpeg|png)$/i.test(blob.pathname),
  );
  return (
    <div className="home-page">
      <Hero />
      <div className="home-page__cards">
        {smallCardContent.map((card, index) => (
          <SmallCard key={index} {...card} />
        ))}
      </div>
      <div className="home-page__cards">
        <FeatureCard
          title="La Fête des voisins"
          date="29 Juin 2026"
          description="Une bien belle soirée qui a réuni pas loin de 70 personnes dans la cour de la Mairie cette année."
          images={photos.map((photo) => photo.url)}
        />
      </div>

      {/* <LoaderLogo size="large" />
      <h1 className="home-page__title">Mairie de Sauqueville</h1>
      <div className="home-page__badge">🚧 Site en construction. 🚧</div> */}
    </div>
  );
};

export default Page;
