import LoaderLogo from "./components/LoaderLogo";

import "./not-found-styles.scss";

const Page = () => {
  return (
    <div className="not-found-page">
      <LoaderLogo size="large" />
      <h1 className="not-found-page__title">Page non trouvée</h1>
      <div className="not-found-page__badge">🚧 Site en construction. 🚧</div>
    </div>
  );
};

export default Page;
