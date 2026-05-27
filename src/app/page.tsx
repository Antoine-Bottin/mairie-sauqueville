import Hero from "./components/Hero/Hero";
import "./styles.scss";

export default function Page() {
  return (
    <div className="home-page">
      <Hero />
      {/* <LoaderLogo size="large" />
      <h1 className="home-page__title">Mairie de Sauqueville</h1>
      <div className="home-page__badge">🚧 Site en construction. 🚧</div> */}
    </div>
  );
}
