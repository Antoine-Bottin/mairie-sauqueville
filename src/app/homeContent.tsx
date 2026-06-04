import { FaUniversity } from "react-icons/fa";
import { FaChartSimple, FaComputer } from "react-icons/fa6";

export const smallCardContent = [
  {
    icon: <FaUniversity />,
    title: "Horaires de la Mairie",
    description: (
      <>
        <ul>
          <li>
            <strong>Lundi:</strong> 17h00 -19h00
          </li>
          <li>
            <strong>Vendredi:</strong> 16h00 -18h00
          </li>
        </ul>
      </>
    ),
    color: "green",
  },
  {
    icon: <FaChartSimple />,
    title: "Chiffre du moment",
    description: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <h1>354</h1>
        <div>personnes habitent Sauqueville</div>
      </div>
    ),
    color: "blue",
  },
  {
    icon: <FaComputer />,
    title: "Permanence du numérique",
    description: (
      <>
        Tous les <strong>Mercredi</strong> de 14h00 à 15h00.
      </>
    ),
    color: "blue",
  },
] as const;
