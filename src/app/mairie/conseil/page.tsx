import ConseilCard from "@/app/components/ConseilCard/ConseilCard";
import { CONSEIL_MUNICIPAL } from "@/app/data";

import "./styles.scss";

export default function PageConseil() {
  return (
    <div className="conseil-page">
      <div className="conseil-page__header">
        <h1 className="conseil-page__title">Le Conseil Municipal</h1>
        <p className="conseil-page__subtitle">
          Découvrez les élus qui composent le conseil municipal de
          Sauqueville.
        </p>
      </div>

      <section className="conseil-grid">
        {CONSEIL_MUNICIPAL.map((elu) => (
          <ConseilCard key={elu.id} elu={elu} />
        ))}
      </section>
    </div>
  );
}
