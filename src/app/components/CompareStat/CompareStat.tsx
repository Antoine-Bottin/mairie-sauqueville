import "./styles.scss";

interface CompareStatProps {
  label: string;
  sauquevilleValue: string;
  agglomerationValue: string;
}

const CompareStat = ({
  label,
  sauquevilleValue,
  agglomerationValue,
}: CompareStatProps) => {
  return (
    <div className="compare-stat">
      <span className="compare-stat__label">{label}</span>
      <div className="compare-stat__values">
        <div className="compare-stat__item compare-stat__item--sauqueville">
          <span className="compare-stat__value">{sauquevilleValue}</span>
          <span className="compare-stat__place">Sauqueville</span>
        </div>
        <div className="compare-stat__item compare-stat__item--agglomeration">
          <span className="compare-stat__value">{agglomerationValue}</span>
          <span className="compare-stat__place">Agglomération</span>
        </div>
      </div>
    </div>
  );
};

export default CompareStat;
