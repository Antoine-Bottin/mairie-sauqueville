import ConseilCard from "@/app/components/ConseilCard/ConseilCard";
import { CONSEIL_MUNICIPAL } from "@/app/data";

export default function PageConseil() {
  return (
    <section className="conseil-grid">
      {CONSEIL_MUNICIPAL.map((elu) => (
        <ConseilCard key={elu.id} elu={elu} />
      ))}
    </section>
  );
}
