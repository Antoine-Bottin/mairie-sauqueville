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

export interface Elu {
  id: number;
  nom: string;
  poste: string;
  photoUrl: string; // Tu peux stocker les photos dans ton dossier /public
}

export const CONSEIL_MUNICIPAL: Elu[] = [
  {
    id: 1,
    nom: "Denis Grenon",
    poste: "Maire",
    photoUrl: "",
  },
  {
    id: 2,
    nom: "Nicolas Lesage",
    poste: "1ère Adjoint",
    photoUrl: "",
  },
  {
    id: 3,
    nom: "Sandrine Lefebre",
    poste: "2nde Adjointe",
    photoUrl: "",
  },
  {
    id: 4,
    nom: "Marie Martin",
    poste: "1ère Adjointe",
    photoUrl: "",
  },
  {
    id: 5,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
  {
    id: 6,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
  {
    id: 7,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
  {
    id: 8,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
  {
    id: 9,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
  {
    id: 10,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
  {
    id: 11,
    nom: "Marie Martin",
    poste: "Conseiller Municipale",
    photoUrl: "",
  },
];
