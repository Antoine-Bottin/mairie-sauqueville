"use client";

import { useState } from "react";
import "./styles.scss";

interface PopulationChartProps {
  series: { year: number; population: number }[];
}

const WIDTH = 600;
const HEIGHT = 220;
const PADDING_X = 30;
const PADDING_Y = 20;

const PopulationChart = ({ series }: PopulationChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const years = series.map((point) => point.year);
  const populations = series.map((point) => point.population);

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const minPop = Math.min(...populations);
  const maxPop = Math.max(...populations);

  const x = (year: number) =>
    PADDING_X +
    ((year - minYear) / (maxYear - minYear)) * (WIDTH - 2 * PADDING_X);

  const y = (population: number) =>
    HEIGHT -
    PADDING_Y -
    ((population - minPop) / (maxPop - minPop || 1)) * (HEIGHT - 2 * PADDING_Y);

  const points = series
    .map((point) => `${x(point.year)},${y(point.population)}`)
    .join(" ");

  const hovered = hoveredIndex !== null ? series[hoveredIndex] : null;

  return (
    <div className="population-chart">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Évolution de la population de ${minYear} à ${maxYear}, de ${series[0].population} à ${series[series.length - 1].population} habitants`}
        className="population-chart__svg"
      >
        <line
          x1={PADDING_X}
          y1={HEIGHT - PADDING_Y}
          x2={WIDTH - PADDING_X}
          y2={HEIGHT - PADDING_Y}
          className="population-chart__axis"
        />
        <polyline points={points} className="population-chart__line" />
        {series.map((point, index) => (
          <g key={point.year}>
            <circle
              cx={x(point.year)}
              cy={y(point.population)}
              r={hoveredIndex === index ? 5 : 3}
              className="population-chart__point"
            />
            <circle
              cx={x(point.year)}
              cy={y(point.population)}
              r={10}
              className="population-chart__hit-area"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </g>
        ))}
        {hovered && (
          <g
            transform={`translate(${x(hovered.year)}, ${y(hovered.population)})`}
            className="population-chart__tooltip"
          >
            <rect x={-30} y={-34} width={60} height={22} rx={4} />
            <text x={0} y={-18} textAnchor="middle">
              {hovered.year} · {hovered.population}
            </text>
          </g>
        )}
      </svg>
      <div className="population-chart__labels">
        <span>
          {minYear} · {series[0].population} hab.
        </span>
        <span>
          {maxYear} · {series[series.length - 1].population} hab.
        </span>
      </div>
    </div>
  );
};

export default PopulationChart;
