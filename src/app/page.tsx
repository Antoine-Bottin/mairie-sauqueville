import Hero from "./components/Hero/Hero";
import SmallCard from "./components/SmallCard/SmallCard";
import { smallCardContent } from "./homeContent";

import "./styles.scss";

export default function Page() {
  return (
    <div className="home-page">
      <Hero />
      <div className="home-page__cards">
        {smallCardContent.map((card, index) => (
          <SmallCard key={index} {...card} />
        ))}
      </div>

      {/* <LoaderLogo size="large" />
      <h1 className="home-page__title">Mairie de Sauqueville</h1>
      <div className="home-page__badge">🚧 Site en construction. 🚧</div> */}
    </div>
  );
}
