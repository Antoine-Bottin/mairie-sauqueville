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
  metier?: string;
  photoUrl: string;
}

export const CONSEIL_MUNICIPAL: Elu[] = [
  {
    id: 1,
    nom: "Denis Grenon",
    poste: "Maire",
    metier: "Electricien",
    photoUrl: "",
  },
  {
    id: 2,
    nom: "Nicolas Lesage",
    poste: "1er Adjoint",
    metier: "Agent de maitrise de la fonction territoriale",
    photoUrl: "",
  },
  {
    id: 3,
    nom: "Sandrine Lefebre",
    poste: "2nde Adjointe",
    metier: "Agent territorial en école maternelle",
    photoUrl: "",
  },
  {
    id: 4,
    nom: "Michel Lapotre",
    poste: "3ème Adjoint",
    metier: "Retraité des PTT",
    photoUrl: "",
  },
  {
    id: 5,
    nom: "Claire Delafosse",
    poste: "Conseillère municipale",
    metier: "Animatrice Qualité Sécurité Environnement",
    photoUrl: "",
  },
  {
    id: 6,
    nom: "Alicia Renault",
    poste: "Conseillère municipale",
    metier: "Employée commerciale",
    photoUrl: "",
  },
  {
    id: 7,
    nom: "Aurélie Stalin",
    poste: "Conseillère municipale",
    metier: "Auxiliaire de vie à domicile",
    photoUrl: "",
  },
  {
    id: 8,
    nom: "Sandra Janvoine-Corruble",
    poste: "Conseillère municipale",
    metier: "Architecte DPLG",
    photoUrl: "",
  },
  {
    id: 9,
    nom: "Steven Fleury",
    poste: "Conseiller municipal",
    metier: "Profession intermédiaire de la santé et du travail social",
    photoUrl: "",
  },
  {
    id: 10,
    nom: "Arnaud Voisin",
    poste: "Conseiller municipal",
    metier: "Technicien industriel",
    photoUrl: "",
  },
  {
    id: 11,
    nom: "Antoine Bottin",
    poste: "Conseiller municipal",
    metier: "Product Builder / Automatisation IA / Developpeur Web",
    photoUrl: "",
  },
];
