import { CardColor } from "@/app/components/SmallCard/SmallCard";
import "./styles.scss";

interface ProportionBarProps {
  label: string;
  value: number;
  total: number;
  color?: CardColor;
}

const ProportionBar = ({
  label,
  value,
  total,
  color = "green",
}: ProportionBarProps) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className={`proportion-bar proportion-bar--${color}`}>
      <div className="proportion-bar__header">
        <span className="proportion-bar__label">{label}</span>
        <span className="proportion-bar__value">
          {value} ({percentage}%)
        </span>
      </div>
      <div className="proportion-bar__track">
        <div
          className="proportion-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProportionBar;
