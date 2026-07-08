import "./styles.scss";

interface KeyFigureProps {
  value: string;
  label: string;
  sublabel?: string;
}

const KeyFigure = ({ value, label, sublabel }: KeyFigureProps) => {
  return (
    <div className="key-figure">
      <span className="key-figure__value">{value}</span>
      <span className="key-figure__label">{label}</span>
      {sublabel && <span className="key-figure__sublabel">{sublabel}</span>}
    </div>
  );
};

export default KeyFigure;
