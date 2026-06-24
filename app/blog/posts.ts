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
    slug: "comment-jai-commence-le-developpement-web-a-15-ans",
    date: "Juin 2026",
    title: "Comment j'ai commencé le développement web à 15 ans",
    excerpt:
      "Entre la radio, le métier de médiamaticien et un stage en informatique qui a tout changé, voici comment j'en suis arrivé à préparer deux CFC en même temps.",
    readTime: "3 min",
    content: [
      {
        heading: "Le déclic",
        paragraphs: [
          "Mon père travaille dans le développement web, avec WordPress. Le voir construire des sites, configurer des thèmes et résoudre des problèmes techniques à la maison m'a beaucoup intéressé en grandissant.",
          "Mais ce n'est pas tout de suite vers l'informatique que je me suis dirigé. En grandissant, c'est la radio qui m'attirait le plus. On m'a expliqué que ce métier portait un nom — médiamaticien — et j'ai décidé de viser cette voie.",
        ],
      },
      {
        heading: "Le stage qui a tout changé",
        paragraphs: [
          "J'ai fait un stage en informatique, un peu pour voir, sans penser que ça changerait quoi que ce soit à mon projet vers le médiamatique. Sauf que ce stage m'a donné un vrai coup de cœur pour le développement web — bien plus fort que ce que j'imaginais.",
          "Découvrir le HTML, le CSS, le JavaScript, et voir qu'avec quelques lignes de code on pouvait créer quelque chose de concret : ce sentiment-là m'a vraiment marqué.",
        ],
      },
      {
        heading: "Et maintenant ?",
        paragraphs: [
          "Aujourd'hui, je ne veux plus choisir entre les deux. Mon objectif, c'est de me préparer pour deux CFC : informaticien et médiamaticien. Ce portfolio est lui-même mon terrain d'entraînement pour la partie développement — chaque page est une occasion de tester quelque chose de nouveau.",
          "Mon but est clair : décrocher un contrat d'apprentissage pour la rentrée 2027, dans l'une de ces deux voies — ou pourquoi pas les deux.",
        ],
      },
    ],
  },
  {
    slug: "pourquoi-le-metier-de-mediamaticien-mattire-aussi",
    date: "Juin 2026",
    title: "Pourquoi le métier de médiamaticien m'attire aussi",
    excerpt:
      "Avant de découvrir le développement web, je voulais faire de la radio. Voici pourquoi le métier de médiamaticien reste une vraie option pour moi.",
    readTime: "3 min",
    content: [
      {
        heading: "Une envie qui vient de la radio",
        paragraphs: [
          "Avant de m'intéresser à l'informatique, c'est la radio qui me faisait rêver. J'aimais l'idée de créer du contenu, de raconter quelque chose à un public, de donner vie à des idées avec du son et des mots.",
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
        heading: "Pourquoi je ne veux pas choisir",
        paragraphs: [
          "Le stage en informatique m'a donné un vrai coup de cœur pour le développement, mais il n'a pas effacé mon intérêt pour la médiamatique. Les deux métiers se complètent finalement assez bien : la rigueur du code d'un côté, la créativité de la communication de l'autre.",
          "C'est pour ça que je me prépare aujourd'hui pour deux CFC en même temps. Quelle que soit l'entreprise qui me fera confiance pour la rentrée 2027, je sais que je m'investirai à fond.",
        ],
      },
    ],
  },
];
