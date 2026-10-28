export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: { heading?: string; paragraphs: string[] }[];
};

export const posts: BlogPost[] = [
  {
    slug: "ce-que-mon-stage-chez-stormbolt-ma-appris",
    date: "Juin 2026",
    title: "Ce que mon stage chez Stormbolt m'a appris",
    excerpt:
      "Un stage pensé comme une simple découverte m'a donné de vrais outils numériques — utiles aujourd'hui pour mes projets de création de contenu.",
    readTime: "3 min",
    content: [
      {
        heading: "Le déclic",
        paragraphs: [
          "Mon père travaille dans le développement web, avec WordPress. Le voir construire des sites, configurer des thèmes et résoudre des problèmes techniques à la maison a éveillé très tôt ma curiosité pour le digital.",
          "Mais c'est la radio qui m'attirait le plus en grandissant. On m'a expliqué que ce métier portait un nom — médiamaticien — et je me suis dirigé vers cette voie.",
        ],
      },
      {
        heading: "Un stage qui m'a beaucoup appris",
        paragraphs: [
          "J'ai fait un stage chez Stormbolt, un peu pour voir. J'y ai conçu GoalieCoach avec Claude Code, une app de planification d'entraînements pour les jeunes gardiens que je coache — mon premier vrai projet numérique complet.",
          "Découvrir comment un site se construit, se déploie, se met à jour : ce sentiment de voir quelque chose de concret prendre vie en ligne m'a vraiment marqué.",
        ],
      },
      {
        heading: "Et maintenant ?",
        paragraphs: [
          "Ce stage n'a rien changé à mon objectif : je me prépare pour un CFC médiamaticien. Mais il m'a donné des outils numériques concrets, que je réutilise aujourd'hui — ce portfolio, conçu avec Claude Code, en est un exemple direct.",
          "Mon but reste clair : décrocher un contrat d'apprentissage médiamaticien pour la rentrée 2027.",
        ],
      },
    ],
  },
  {
    slug: "pourquoi-le-metier-de-mediamaticien-me-passionne",
    date: "Juin 2026",
    title: "Pourquoi le métier de médiamaticien me passionne",
    excerpt:
      "Avant tout, c'est la radio qui me faisait rêver. Voici pourquoi le métier de médiamaticien est devenu mon objectif.",
    readTime: "3 min",
    content: [
      {
        heading: "Une envie qui vient de la radio",
        paragraphs: [
          "Depuis toujours, c'est la radio qui me fait rêver. J'aime l'idée de créer du contenu, de raconter quelque chose à un public, de donner vie à des idées avec du son et des mots.",
          "C'est en me renseignant sur ce métier que j'ai découvert qu'il portait un nom précis en Suisse : médiamaticien. Un métier à la croisée du digital, de la création et de la communication — exactement ce qui m'attirait.",
        ],
      },
      {
        heading: "Ce que la médiamatique recouvre vraiment",
        paragraphs: [
          "Le médiamaticien ne fait pas que de la radio : il conçoit des contenus visuels, des présentations, participe à des projets de communication digitale, et utilise des outils comme Canva ou des logiciels de montage. C'est un métier polyvalent, à mi-chemin entre la technique et la création.",
          "Mon exposé sur les quatre langues de la Suisse, réalisé avec un camarade pour le cours d'histoire, est un bon exemple de ce que j'aime faire dans ce domaine : structurer une recherche, créer un support visuel clair, et le présenter devant un public.",
        ],
      },
      {
        heading: "Mon objectif pour 2027",
        paragraphs: [
          "La gestion du compte Instagram et de l'identité visuelle de mon équipe de hockey, ou encore l'habillage de mon jeu Capy Hockey, sont des terrains d'entraînement concrets pour ce métier — bien avant même de commencer un apprentissage.",
          "Mon objectif est clair : décrocher un contrat d'apprentissage médiamaticien pour la rentrée 2027, et m'y investir à fond.",
        ],
      },
    ],
  },
];
