import "./styles.scss";

interface AgePyramidProps {
  data: { label: string; hommes: number; femmes: number }[];
}

const AgePyramid = ({ data }: AgePyramidProps) => {
  const maxValue = Math.max(...data.flatMap((d) => [d.hommes, d.femmes]));

  return (
    <div className="age-pyramid">
      <div className="age-pyramid__legend">
        <span className="age-pyramid__legend-item age-pyramid__legend-item--hommes">
          Hommes
        </span>
        <span className="age-pyramid__legend-item age-pyramid__legend-item--femmes">
          Femmes
        </span>
      </div>

      {data.map((tranche) => (
        <div key={tranche.label} className="age-pyramid__row">
          <div className="age-pyramid__side age-pyramid__side--hommes">
            <span className="age-pyramid__value">{tranche.hommes}</span>
            <div
              className="age-pyramid__bar age-pyramid__bar--hommes"
              style={{ width: `${(tranche.hommes / maxValue) * 100}%` }}
            />
          </div>

          <span className="age-pyramid__label">{tranche.label}</span>

          <div className="age-pyramid__side age-pyramid__side--femmes">
            <div
              className="age-pyramid__bar age-pyramid__bar--femmes"
              style={{ width: `${(tranche.femmes / maxValue) * 100}%` }}
            />
            <span className="age-pyramid__value">{tranche.femmes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgePyramid;
