"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type Scores = {
  info: number; media: number;
  disc_d: number; disc_i: number; disc_s: number; disc_c: number;
  mbti_e: number; mbti_i: number;
  mbti_t: number; mbti_f: number;
  mbti_s: number; mbti_n: number;
  mbti_j: number; mbti_p: number;
};

type Answer = { label: string; points: Partial<Scores> };
type Question = { id: number; text: string; answers: Answer[] };
type Chapter = { title: string; emoji: string; questions: Question[] };

// ─── Chapters & Questions ────────────────────────────────────────────────────
const chapters: Chapter[] = [
  {
    title: "Qui tu es",
    emoji: "🧠",
    questions: [
      {
        id: 1,
        text: "Après une longue journée chargée, comment tu te ressources ?",
        answers: [
          { label: "En voyant des amis ou en sortant — les autres me rechargent", points: { mbti_e: 2, disc_i: 2, media: 1 } },
          { label: "Seul(e) dans ma chambre, calme total — j'ai besoin de silence", points: { mbti_i: 2, disc_c: 1, disc_s: 1, info: 1 } },
          { label: "Avec une ou deux personnes proches, pas plus", points: { mbti_i: 1, disc_s: 1 } },
        ],
      },
      {
        id: 2,
        text: "Dans un groupe ou une équipe, quel rôle tu prends naturellement ?",
        answers: [
          { label: "Le meneur — je propose des idées, je décide, j'avance", points: { disc_d: 3, mbti_e: 1, info: 1 } },
          { label: "L'animateur — j'ambiance, je motive, je crée de la cohésion", points: { disc_i: 3, mbti_e: 2, media: 1 } },
          { label: "Le pilier — fiable, je fais ma part sans chercher les projecteurs", points: { disc_s: 3, mbti_i: 1 } },
          { label: "Le cerveau — j'analyse, je questionne, je cherche l'excellence", points: { disc_c: 3, mbti_t: 1, info: 1 } },
        ],
      },
      {
        id: 3,
        text: "Dans une grande fête où tu ne connais presque personne, tu…",
        answers: [
          { label: "Tu kiffes — c'est l'occasion de rencontrer du monde", points: { mbti_e: 3, disc_i: 2, media: 1 } },
          { label: "Tu t'en sors bien mais tu préfères les petits groupes", points: { mbti_e: 1, disc_s: 1 } },
          { label: "Tu observes, tu parles à quelques personnes choisies", points: { mbti_i: 2, disc_c: 1 } },
          { label: "Tu as du mal — les grandes foules t'épuisent", points: { mbti_i: 3, disc_c: 1, info: 1 } },
        ],
      },
      {
        id: 4,
        text: "Quand tu dois prendre une décision importante, tu te bases sur…",
        answers: [
          { label: "La logique et les faits — ce qui est rationnel et mesurable", points: { mbti_t: 3, disc_c: 2, info: 2 } },
          { label: "Tes valeurs et ce que tu ressens — ce qui semble juste", points: { mbti_f: 3, disc_s: 1, disc_i: 1, media: 1 } },
          { label: "Un mix des deux selon le contexte", points: { mbti_t: 1, mbti_f: 1 } },
        ],
      },
      {
        id: 5,
        text: "Quel environnement de travail idéal t'attire le plus ?",
        answers: [
          { label: "Open-space dynamique, beaucoup d'interactions, projets variés", points: { mbti_e: 2, disc_i: 2, media: 1 } },
          { label: "Bureau calme, focus deep work, peu d'interruptions", points: { mbti_i: 2, disc_c: 2, info: 2 } },
          { label: "Hybride — du calme pour produire + des moments d'équipe", points: { mbti_i: 1, disc_s: 1 } },
          { label: "Partout — je suis adaptable tant que le projet est intéressant", points: { disc_d: 1, mbti_p: 1 } },
        ],
      },
      {
        id: 6,
        text: "Ce qui te donne le plus d'énergie dans ta journée…",
        answers: [
          { label: "Résoudre un problème difficile tout seul", points: { mbti_i: 1, disc_c: 2, mbti_t: 1, info: 2 } },
          { label: "Convaincre quelqu'un ou partager une idée", points: { mbti_e: 1, disc_i: 2, mbti_f: 1, media: 1 } },
          { label: "Voir un projet avancer et être terminé", points: { disc_d: 1, disc_s: 1, mbti_j: 1 } },
          { label: "Apprendre quelque chose de nouveau", points: { disc_c: 1, mbti_n: 1 } },
        ],
      },
    ],
  },
  {
    title: "Comment tu penses",
    emoji: "💡",
    questions: [
      {
        id: 7,
        text: "Tu préfères les projets qui ont…",
        answers: [
          { label: "Des règles claires, des objectifs précis, un plan défini", points: { mbti_j: 2, disc_c: 2, mbti_s: 1, info: 1 } },
          { label: "De la liberté, de la créativité, un brief ouvert", points: { mbti_p: 2, disc_i: 1, mbti_n: 2, media: 2 } },
          { label: "Un cadre de base avec une marge de créativité", points: { mbti_j: 1, mbti_p: 1 } },
        ],
      },
      {
        id: 8,
        text: "En général, quand tu travailles sur quelque chose, tu es plutôt…",
        answers: [
          { label: "Très organisé(e) — listes, planning, étapes", points: { mbti_j: 3, disc_c: 2, info: 1 } },
          { label: "Assez flexible — tu t'adaptes selon l'humeur du moment", points: { mbti_p: 3, disc_i: 1, media: 1 } },
          { label: "Quelque part au milieu — organisé sur les grandes lignes", points: { mbti_j: 1, mbti_p: 1 } },
        ],
      },
      {
        id: 9,
        text: "Une idée originale vient de nulle part dans ta tête. Ton premier réflexe ?",
        answers: [
          { label: "Je la note immédiatement et j'explore comment la réaliser", points: { mbti_n: 3, disc_i: 1, mbti_p: 1, media: 1 } },
          { label: "J'évalue si c'est logiquement faisable avant de m'enthousiasmer", points: { mbti_t: 2, disc_c: 2, mbti_s: 1, info: 1 } },
          { label: "J'en parle à quelqu'un pour avoir son avis", points: { mbti_f: 1, disc_i: 1, mbti_e: 1 } },
        ],
      },
      {
        id: 10,
        text: "Comment tu apprends mieux ?",
        answers: [
          { label: "En lisant/regardant, puis en pratiquant seul(e) de façon méthodique", points: { mbti_i: 1, disc_c: 1, mbti_s: 1, info: 1 } },
          { label: "En faisant tout de suite, en essayant-ratant-ajustant", points: { disc_d: 1, mbti_p: 2, info: 1 } },
          { label: "En regardant quelqu'un faire, puis en imitant", points: { disc_s: 1, mbti_s: 1 } },
          { label: "En explorant librement, sans cadre imposé", points: { mbti_n: 2, mbti_p: 1, media: 1 } },
        ],
      },
      {
        id: 11,
        text: "Un ami te demande un retour honnête sur son travail (problèmes évidents). Tu fais quoi ?",
        answers: [
          { label: "Je lui dis directement les problèmes — d'abord les faits, puis les pistes", points: { mbti_t: 3, disc_d: 1, disc_c: 1, info: 1 } },
          { label: "Je commence par les points positifs avant d'aborder ce qui coince", points: { mbti_f: 3, disc_i: 1, disc_s: 1, media: 1 } },
          { label: "Je pose des questions pour qu'il realise lui-même", points: { disc_c: 1, mbti_n: 1 } },
        ],
      },
      {
        id: 12,
        text: "Ton niveau en maths/logique à l'école, c'est…",
        answers: [
          { label: "Fort — j'aime les maths et la logique, ça me vient naturellement", points: { mbti_t: 2, disc_c: 1, info: 3 } },
          { label: "Correct — je gère, mais c'est pas ma passion", points: { mbti_t: 1, info: 1 } },
          { label: "Faible — les matières créatives ou humaines m'attirent plus", points: { mbti_f: 1, media: 2 } },
        ],
      },
      {
        id: 13,
        text: "Ce qui compte le plus pour toi au quotidien dans le travail…",
        answers: [
          { label: "Que la solution soit optimale et techniquement correcte", points: { mbti_t: 2, disc_c: 2, info: 2 } },
          { label: "Que les gens soient satisfaits et que l'ambiance soit bonne", points: { mbti_f: 2, disc_s: 1, disc_i: 1, media: 2 } },
          { label: "Que les deux coexistent — qualité ET relationnel", points: {} },
        ],
      },
    ],
  },
  {
    title: "Informatique — c'est pour toi ?",
    emoji: "💻",
    questions: [
      {
        id: 14,
        text: "Tu utilises une app, quelque chose bug. Ta réaction naturelle ?",
        answers: [
          { label: "Ça m'intéresse — j'essaie de comprendre pourquoi ça plante", points: { disc_c: 2, info: 3 } },
          { label: "Je ferme et je relance, c'est tout", points: {} },
          { label: "Je suis frustré(e) mais ça ne m'inspire pas de curiosité technique", points: { media: 1 } },
        ],
      },
      {
        id: 15,
        text: "Tu as déjà codé sérieusement (HTML, Python, JS, etc.). C'était comment ?",
        answers: [
          { label: "J'adorais — voir son code fonctionner, c'est incroyablement satisfaisant", points: { info: 4, disc_c: 1 } },
          { label: "J'ai essayé, c'était ok mais pas une passion", points: { info: 1 } },
          { label: "Je n'ai pas encore vraiment essayé sérieusement", points: {} },
          { label: "Ça me stressait ou m'ennuyait — pas pour moi", points: { media: 2 } },
        ],
      },
      {
        id: 16,
        text: "Imagine ta journée type comme dev junior : coder des fonctionnalités, déboguer, réunions techniques, PR GitHub. Tu te projettes ?",
        answers: [
          { label: "Complètement — je me vois bien dans cet environnement", points: { info: 4 } },
          { label: "La partie résolution de problèmes oui, le reste moins", points: { info: 2 } },
          { label: "Mouais — le côté solitaire et répétitif du code me pèserait", points: { media: 2, mbti_e: 1 } },
          { label: "Pas du tout — ça ne m'attire pas vraiment", points: { media: 3 } },
        ],
      },
      {
        id: 17,
        text: "L'aspect 'puzzles logiques' de la programmation (algorithmes, structures de données, débogage)…",
        answers: [
          { label: "J'adore — c'est comme résoudre un mystère, très satisfaisant", points: { info: 3, mbti_t: 1, disc_c: 1 } },
          { label: "C'est intéressant, mais pas mon moteur principal", points: { info: 1 } },
          { label: "Je préfère créer et concevoir que résoudre des puzzles", points: { media: 2, mbti_n: 1 } },
        ],
      },
      {
        id: 18,
        text: "En informatique, qu'est-ce qui t'attire le plus ?",
        answers: [
          { label: "Le backend / la logique — ce qui se passe 'sous le capot'", points: { info: 3, mbti_i: 1, disc_c: 1 } },
          { label: "Le frontend / le design d'interface — que ce soit beau et fluide", points: { info: 1, media: 2 } },
          { label: "La cybersécurité ou l'IA — les domaines qui vont exploser", points: { info: 3, disc_d: 1 } },
          { label: "Rien de particulier — l'informatique reste un moyen pas une passion", points: { media: 2 } },
        ],
      },
      {
        id: 19,
        text: "Si tu devais apprendre sérieusement la programmation (pas juste une intro), tu serais…",
        answers: [
          { label: "Ultra motivé(e) — c'est quelque chose que je veux vraiment maîtriser", points: { info: 3 } },
          { label: "Prêt(e) à faire l'effort même si ce n'est pas naturel pour moi", points: { info: 1 } },
          { label: "Obligé(e) si c'est demandé, mais pas de ma propre initiative", points: { media: 2 } },
        ],
      },
      {
        id: 20,
        text: "IA, cloud, cybersécurité — quand tu lis/vois ça dans les news…",
        answers: [
          { label: "Ça m'intéresse vraiment, j'ai envie d'approfondir", points: { info: 3, disc_c: 1 } },
          { label: "C'est intéressant comme info générale, pas envie d'y bosser", points: {} },
          { label: "Ça ne me touche pas particulièrement", points: { media: 1 } },
        ],
      },
    ],
  },
  {
    title: "Médiamatique — c'est pour toi ?",
    emoji: "🎙️",
    questions: [
      {
        id: 21,
        text: "Tu vois une belle affiche, une vidéo bien montée, un site super designé. Ta réaction ?",
        answers: [
          { label: "Bluffé(e) — j'ai envie de savoir comment c'est fait et de le reproduire", points: { media: 4, disc_i: 1 } },
          { label: "J'apprécie mais ça ne m'inspire pas de passer du temps à le créer", points: {} },
          { label: "Je me demande surtout comment ça a été codé techniquement", points: { info: 2 } },
        ],
      },
      {
        id: 22,
        text: "Canva, Premiere Pro, Lightroom, Illustrator — ces outils créatifs t'attirent ?",
        answers: [
          { label: "Oui ! Je les utilise déjà ou j'ai vraiment envie d'apprendre", points: { media: 3, disc_i: 1 } },
          { label: "Canva oui pour des trucs simples, les autres moins", points: { media: 1 } },
          { label: "Pas vraiment — je préfère les outils de développement / logique", points: { info: 2 } },
        ],
      },
      {
        id: 23,
        text: "Tu crées du contenu pour les réseaux sociaux (TikTok, Instagram, YouTube) ?",
        answers: [
          { label: "Oui, j'aime ça — je fais déjà des choses perso régulièrement", points: { media: 4, mbti_e: 1, disc_i: 2 } },
          { label: "J'y ai pensé mais je n'ai pas encore franchi le pas", points: { media: 2 } },
          { label: "Je consomme mais créer du contenu ne m'intéresse pas vraiment", points: { info: 1 } },
        ],
      },
      {
        id: 24,
        text: "Imagine ta journée type comme médiamaticien junior : production vidéo, identité visuelle pour des clients, gestion réseaux sociaux d'une entreprise. Tu te projettes ?",
        answers: [
          { label: "Totalement — c'est exactement ce que je veux faire", points: { media: 4, disc_i: 1 } },
          { label: "La partie créative oui, mais la partie client me stresse un peu", points: { media: 2, mbti_i: 1 } },
          { label: "Mouais — l'aspect communication/client permanent ce n'est pas pour moi", points: { info: 2, mbti_i: 1 } },
          { label: "Pas du tout — ça ne m'attire pas vraiment", points: { info: 3 } },
        ],
      },
      {
        id: 25,
        text: "La narration visuelle — raconter une histoire par l'image, la mise en page, la vidéo — ça t'attire ?",
        answers: [
          { label: "Beaucoup — j'ai un sens de l'esthétique et du storytelling naturel", points: { media: 3, mbti_f: 1, mbti_n: 1 } },
          { label: "Un peu — mais c'est plus un intérêt général qu'une passion", points: { media: 1 } },
          { label: "Pas tellement — je préfère construire des systèmes qui fonctionnent", points: { info: 2, mbti_t: 1 } },
        ],
      },
      {
        id: 26,
        text: "Un client te dit : 'Je veux une campagne qui montre notre valeur humaine.' Tu…",
        answers: [
          { label: "T'es à fond — créer une histoire émotionnelle, c'est ce que tu fais de mieux", points: { media: 3, mbti_f: 2, disc_i: 1 } },
          { label: "Tu comprends l'idée mais tu préfères les briefs techniques", points: { info: 2, mbti_t: 1 } },
          { label: "Tu aimerais essayer mais tu ne saurais pas vraiment par où commencer", points: {} },
        ],
      },
      {
        id: 27,
        text: "Dans 5 ans, quelle phrase te rendrait le plus fier(ère) ?",
        answers: [
          { label: "\"J'ai développé l'app qu'utilisent des milliers de personnes\"", points: { info: 3, disc_d: 1 } },
          { label: "\"J'ai créé la campagne qui a fait décoller cette marque\"", points: { media: 3, disc_i: 1 } },
          { label: "\"J'ai monté ma boîte qui combine les deux\"", points: { disc_d: 2, mbti_n: 1 } },
          { label: "\"J'ai un super équilibre vie pro/perso et un bon salaire\"", points: { disc_s: 2 } },
        ],
      },
    ],
  },
  {
    title: "Collaboration & clients",
    emoji: "🤝",
    questions: [
      {
        id: 28,
        text: "Travailler régulièrement avec des clients (présenter, recevoir du feedback, ajuster)…",
        answers: [
          { label: "J'adore — c'est stimulant d'avoir un retour humain direct", points: { mbti_e: 2, disc_i: 2, mbti_f: 1, media: 2 } },
          { label: "Ça va — je suis à l'aise même si ce n'est pas ma partie préférée", points: {} },
          { label: "Je préfère être derrière les écrans — le contact client régulier me pèse", points: { mbti_i: 2, info: 2 } },
        ],
      },
      {
        id: 29,
        text: "En équipe sur un projet, ta frustration principale serait quoi ?",
        answers: [
          { label: "Quand les gens ne respectent pas les spécifications ou les délais", points: { mbti_j: 1, disc_c: 1, info: 1 } },
          { label: "Quand l'ambiance est mauvaise et que personne ne communique", points: { mbti_f: 1, disc_s: 1, media: 1 } },
          { label: "Quand on perd du temps en réunions inutiles au lieu de produire", points: { disc_d: 2 } },
          { label: "Quand on est trop rigide et qu'il n'y a pas de place pour la créativité", points: { mbti_p: 1, disc_i: 1, media: 1 } },
        ],
      },
      {
        id: 30,
        text: "Ton chef te demande de retravailler complètement quelque chose après 3 jours de boulot. Tu…",
        answers: [
          { label: "Demandes les raisons précises et tu ajustes de façon méthodique", points: { disc_c: 2, mbti_t: 1, info: 1 } },
          { label: "C'est dur psychologiquement mais tu t'adaptes et tu t'améliores", points: { disc_s: 1, mbti_f: 1 } },
          { label: "Tu négocies — tu proposes un compromis argumenté", points: { disc_d: 2, disc_i: 1 } },
        ],
      },
      {
        id: 31,
        text: "Tu dois expliquer un concept compliqué à quelqu'un qui n'y connaît rien. Tu…",
        answers: [
          { label: "Trouves une analogie créative pour rendre ça visuel et compréhensible", points: { mbti_n: 2, disc_i: 1, media: 2 } },
          { label: "Expliques étape par étape de façon précise et structurée", points: { disc_c: 2, mbti_t: 1, info: 1 } },
          { label: "Lui proposes une demo pratique plutôt qu'une explication théorique", points: { disc_d: 1, mbti_s: 1 } },
        ],
      },
      {
        id: 32,
        text: "La partie que tu redouterais le plus dans ton futur métier ?",
        answers: [
          { label: "Passer des heures à déboguer un code sans trouver l'erreur", points: { media: 2 } },
          { label: "Devoir convaincre un client sceptique que ta proposition créative est bonne", points: { info: 2 } },
          { label: "Les deux me semblent gérables, ça fait partie du job", points: {} },
          { label: "Les réunions et la bureaucratie — dans les deux cas", points: { disc_d: 1 } },
        ],
      },
    ],
  },
  {
    title: "L'avenir & l'argent",
    emoji: "📈",
    questions: [
      {
        id: 33,
        text: "Ce qui compte le plus dans ton futur emploi (choisis le plus important) :",
        answers: [
          { label: "Un bon salaire — je veux être bien payé(e) pour mon travail", points: { disc_d: 1, info: 2 } },
          { label: "Un bon équilibre vie pro / vie perso — le boulot ne prend pas tout", points: { disc_s: 2 } },
          { label: "Un travail créatif et varié — je ne veux pas me répéter", points: { disc_i: 2, media: 2 } },
          { label: "L'impact — créer quelque chose d'utile qui serve vraiment à des gens", points: { disc_d: 1, info: 1, media: 1 } },
        ],
      },
      {
        id: 34,
        text: "Entre ces deux offres d'emploi à 25 ans, tu choisis ?",
        answers: [
          { label: "Dev fullstack IA dans une startup tech : CHF 90k–110k, horaires parfois lourds", points: { info: 3, disc_d: 1 } },
          { label: "Médiamaticien(ne) dans une agence créative : CHF 70k–85k, projets variés, bonne ambiance", points: { media: 3, disc_i: 1 } },
          { label: "Je prendrais celle où l'équilibre vie pro/perso est le mieux garanti", points: { disc_s: 2 } },
        ],
      },
      {
        id: 35,
        text: "L'IA va transformer les deux métiers dans 5 ans. Ton rapport à ça ?",
        answers: [
          { label: "Je veux être dans le camp de ceux qui construisent et pilotent l'IA", points: { info: 3, disc_d: 1 } },
          { label: "Je veux travailler dans la créativité humaine que l'IA ne peut pas remplacer", points: { media: 2, disc_i: 1 } },
          { label: "Je veux utiliser l'IA comme outil dans mon métier créatif", points: { media: 1, info: 1, mbti_n: 1 } },
          { label: "Je ne sais pas encore — ça dépend de l'évolution du marché", points: {} },
        ],
      },
      {
        id: 36,
        text: "La formation continue tout au long de ta carrière…",
        answers: [
          { label: "Je suis à fond — en informatique il faut toujours se former, j'aime ça", points: { info: 2, disc_c: 1, mbti_n: 1 } },
          { label: "Oui, mais plutôt sur des projets créatifs et humains, pas du code", points: { media: 2, disc_i: 1 } },
          { label: "J'apprends quand j'ai besoin, mais ce n'est pas mon moteur premier", points: { disc_s: 1 } },
        ],
      },
      {
        id: 37,
        text: "Dans ton futur job, la stabilité vs l'aventure ?",
        answers: [
          { label: "Je préfère une structure stable, grande boîte, CDI, prévisibilité", points: { disc_s: 2, mbti_j: 1 } },
          { label: "Un mix — du solide comme base mais avec de la nouveauté constante", points: { disc_s: 1, disc_i: 1 } },
          { label: "L'aventure — startup, risque, possibilité de créer ma boîte un jour", points: { disc_d: 2, mbti_n: 1, info: 1 } },
        ],
      },
    ],
  },
  {
    title: "Mises en situation",
    emoji: "🎯",
    questions: [
      {
        id: 38,
        text: "Scénario : ton maître de stage te donne 3h libres pour créer ce que tu veux. Tu fais quoi ?",
        answers: [
          { label: "Je code une mini app ou une fonctionnalité fun", points: { info: 4 } },
          { label: "Je crée un visuel, une vidéo courte ou un contenu", points: { media: 4 } },
          { label: "J'explore les deux selon l'humeur", points: {} },
          { label: "Je demande un brief plus précis — j'ai besoin d'un cadre", points: { mbti_s: 1, disc_c: 1 } },
        ],
      },
      {
        id: 39,
        text: "Scénario : projet scolaire à présenter en classe. Tu prends quel rôle ?",
        answers: [
          { label: "Je construis la partie technique — code, données, logique", points: { info: 3, mbti_i: 1 } },
          { label: "Je gère les visuels et la présentation — slides, design, pitch", points: { media: 3, mbti_e: 1 } },
          { label: "Je coordonne l'équipe et m'assure que tout s'assemble bien", points: { disc_s: 2, disc_d: 1 } },
          { label: "Je fais ce dont l'équipe a le plus besoin — je m'adapte", points: { disc_s: 1 } },
        ],
      },
      {
        id: 40,
        text: "Scénario : tu dois convaincre tes parents de financer ton projet perso. Tu leur montres quoi ?",
        answers: [
          { label: "Un projet que j'ai codé et qui tourne en ligne — avec des métriques", points: { info: 3, disc_c: 1 } },
          { label: "Une vidéo ou une campagne que j'ai créée — avec des retours positifs", points: { media: 3, disc_i: 1 } },
          { label: "Un business plan solide avec des chiffres", points: { disc_d: 2, mbti_t: 1 } },
          { label: "Honnêtement je leur parlerais — les projets ce n'est pas encore mon truc", points: {} },
        ],
      },
    ],
  },
];

// ─── Personality definitions ────────────────────────────────────────────────
const discProfiles = {
  d: {
    color: "text-red-400",
    badge: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
    label: "ROUGE — Dominant",
    emoji: "🔴",
    desc: "Tu es direct, ambitieux et orienté résultats. Tu avances vite, tu decides, tu assumes. Tu fonctionnes bien sous pression et tu n'aimes pas perdre du temps.",
  },
  i: {
    color: "text-yellow-400",
    badge: "bg-yellow-500/10 border-yellow-500/20",
    dot: "bg-yellow-400",
    label: "JAUNE — Influent",
    emoji: "🟡",
    desc: "Tu rayonnes, tu communiques, tu inspires. Enthousiaste et créatif(ve), tu es naturellement à l'aise avec les gens et tu as un vrai sens du storytelling.",
  },
  s: {
    color: "text-green-400",
    badge: "bg-green-500/10 border-green-500/20",
    dot: "bg-green-400",
    label: "VERT — Stable",
    emoji: "🟢",
    desc: "Tu es fiable, patient(e) et excellent(e) en équipe. Tu mets les gens à l'aise, tu gères bien la durée et tu fonctionnes bien dans des environnements stables.",
  },
  c: {
    color: "text-blue-400",
    badge: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
    label: "BLEU — Analytique",
    emoji: "🔵",
    desc: "Tu es précis(e), rigoureux(se) et orienté(e) qualité. Tu analyses avant d'agir, tu cherches l'excellence et tu te méfies des décisions prises à la va-vite.",
  },
};

const mbtiTypes: Record<string, { name: string; desc: string }> = {
  INTJ: { name: "L'Architecte", desc: "Stratégique et indépendant(e), tu construis des systèmes complexes avec une vision long terme. Rare et très recherché en informatique." },
  INTP: { name: "Le Logicien", desc: "Curieux et analytique, tu aimes décortiquer les problèmes. La programmation et la recherche sont tes terrains de jeu naturels." },
  ENTJ: { name: "Le Commandant", desc: "Leader naturel orienté vers l'efficacité. Tu peux exceller dans les deux voies, surtout en position de chef de projet." },
  ENTP: { name: "Le Débatteur", desc: "Créatif et inventif, tu sautes d'une idée à l'autre. Excellent(e) en innovation, UX, ou dev produit." },
  INFJ: { name: "L'Avocat", desc: "Profond(e) et empathique, tu cherches du sens dans ton travail. La communication avec impact humain te convient bien." },
  INFP: { name: "Le Médiateur", desc: "Idéaliste et créatif(ve), tu travailles mieux quand le projet a du sens pour toi. La création de contenu te corresponds naturellement." },
  ENFJ: { name: "Le Protagoniste", desc: "Charismatique et naturellement tourné(e) vers les autres. La communication, la formation ou la direction d'équipe créative sont faites pour toi." },
  ENFP: { name: "Le Campagneur", desc: "Enthousiaste et visionnaire, tu peux tout faire si ça t'inspire. Excellent(e) en médiamatique avec une touche créative forte." },
  ISTJ: { name: "Le Logisticien", desc: "Fiable, méthodique et discret(ète). Tu excelles dans des environnements structurés — développement, qualité, systèmes." },
  ISFJ: { name: "Le Défenseur", desc: "Attentif(ve) aux détails et aux autres. Tu t'épanouis dans des rôles où l'aide et le soin aux utilisateurs priment." },
  ESTJ: { name: "Le Dirigeant", desc: "Organisé(e) et décidé(e). Tu excelles en gestion de projet ou en tech management." },
  ESFJ: { name: "Le Consul", desc: "Social(e) et attentif(ve) aux autres. La communication, le marketing ou la gestion de communauté te conviennent." },
  ISTP: { name: "Le Virtuose", desc: "Pratique et analytique. Tu aimes démonter les choses pour comprendre. Excellent(e) en informatique système ou en dev." },
  ISFP: { name: "L'Aventurier", desc: "Artiste dans l'âme, sensible à l'esthétique. Le design, la photo, la production créative te parlent naturellement." },
  ESTP: { name: "L'Entrepreneur", desc: "Direct(e), pragmatique et rapide. Tu apprends en faisant. Le développement produit ou la communication dynamique te correspondent." },
  ESFP: { name: "L'Amuseur", desc: "Spontané(e) et créatif(ve). Tu brilles dans les rôles visibles : présentation, médias, réseaux sociaux, événementiel." },
};

// ─── Analysis helpers ────────────────────────────────────────────────────────
function getDominantDisc(scores: Scores): keyof typeof discProfiles {
  const keys = ["d", "i", "s", "c"] as const;
  return keys.reduce((a, b) =>
    (scores[`disc_${a}` as keyof Scores] as number) >= (scores[`disc_${b}` as keyof Scores] as number) ? a : b
  );
}

function getMbtiType(scores: Scores): string {
  const ei = scores.mbti_e >= scores.mbti_i ? "E" : "I";
  const sn = scores.mbti_n >= scores.mbti_s ? "N" : "S";
  const tf = scores.mbti_t >= scores.mbti_f ? "T" : "F";
  const jp = scores.mbti_j >= scores.mbti_p ? "J" : "P";
  return `${ei}${sn}${tf}${jp}`;
}

function getCompatibility(scores: Scores) {
  const disc = getDominantDisc(scores);
  const mbti = getMbtiType(scores);

  // Base
  let infoBonus = 0;
  let mediaBonus = 0;

  // DISC bonuses
  if (disc === "c") infoBonus += 3;
  if (disc === "i") mediaBonus += 3;
  if (disc === "s") mediaBonus += 1;
  if (disc === "d") infoBonus += 1;

  // MBTI bonuses
  if (mbti.includes("T") && mbti.includes("J")) infoBonus += 3;
  if (mbti.includes("F") && mbti.includes("P")) mediaBonus += 3;
  if (mbti.includes("I") && mbti.includes("N") && mbti.includes("T")) infoBonus += 2;
  if (mbti.includes("E") && mbti.includes("F")) mediaBonus += 2;

  const rawInfo = scores.info + infoBonus;
  const rawMedia = scores.media + mediaBonus;
  const total = rawInfo + rawMedia || 1;

  return {
    infoPercent: Math.round((rawInfo / total) * 100),
    mediaPercent: Math.round((rawMedia / total) * 100),
    winner: rawInfo >= rawMedia ? "info" : "media",
  };
}

function getDetailedResult(scores: Scores) {
  const disc = getDominantDisc(scores);
  const mbti = getMbtiType(scores);
  const compat = getCompatibility(scores);
  const profile = discProfiles[disc];
  const mbtiProfile = mbtiTypes[mbti] ?? { name: "Profil unique", desc: "Ton profil est difficile à classer simplement — tu combines des traits rares." };

  // Build reasons
  const infoReasons: string[] = [];
  const mediaReasons: string[] = [];

  if (disc === "c") infoReasons.push("Ton profil Bleu (Analytique) correspond parfaitement au métier de développeur — tu cherches l'exactitude, tu débogues avec méthode.");
  if (disc === "i") mediaReasons.push("Ton profil Jaune (Influent) est le profil type du médiamaticien — tu sais communiquer, convaincre et raconter des histoires.");
  if (disc === "s") mediaReasons.push("Ton profil Vert (Stable) te rend excellent(e) dans les équipes créatives — patient(e), à l'écoute, orienté(e) qualité relationnelle.");
  if (disc === "d") infoReasons.push("Ton profil Rouge (Dominant) t'aidera à avancer vite dans les projets tech — tu n'aimes pas rester bloqué(e).");

  if (mbti.includes("T") && mbti.includes("J")) infoReasons.push(`Ton type MBTI ${mbti} (${mbtiProfile.name}) correspond à un profil logique et structuré — idéal pour le développement.`);
  if (mbti.includes("F") && mbti.includes("E")) mediaReasons.push(`Ton type MBTI ${mbti} (${mbtiProfile.name}) montre que tu puises ton énergie dans les relations humaines — essentiel en médiamatique.`);
  if (mbti.includes("N") && mbti.includes("P")) mediaReasons.push("Ta dimension Intuition + Perception te rend créatif(ve) et ouvert(e) aux idées nouvelles — très utile en création de contenu.");
  if (mbti.includes("I") && mbti.includes("T")) infoReasons.push("Ta dimension Introversion + Thinking te permet de rester concentré(e) longtemps sur des problèmes complexes — qualité essentielle en dev.");

  if (scores.info >= 8) infoReasons.push("Tes réponses montrent une attraction claire et répétée pour l'univers du code, des systèmes et de la logique.");
  if (scores.media >= 8) mediaReasons.push("Tes réponses montrent un attrait naturel pour la créativité, la communication et la production de contenu.");

  const winner = compat.winner;
  const winnerReasons = winner === "info" ? infoReasons : mediaReasons;
  const loserReasons = winner === "info" ? mediaReasons : infoReasons;

  // Market analysis
  const marketInfo = {
    trend: "📈 +34% de postes en 5 ans en Suisse",
    salary: "CHF 85k–130k à 25 ans pour un dev expérimenté",
    demand: "Cybersécurité, IA, cloud — les domaines les plus demandés",
    risk: "L'IA génère du code simple mais le dev créatif reste humain",
    note: "La Suisse est le pays qui paye le mieux les devs en Europe",
  };
  const marketMedia = {
    trend: "📊 +18% de postes en 5 ans, marché plus saturé que l'info",
    salary: "CHF 65k–90k à 25 ans pour un médiamaticien expérimenté",
    demand: "UX/UI, stratégie digitale, brand content — forte demande",
    risk: "L'IA automatise la création basique mais pas la stratégie créative",
    note: "Le profil hybride (dev + media) est très recherché et rare",
  };

  return {
    disc, mbti, profile, mbtiProfile, compat,
    winner, winnerReasons, loserReasons,
    market: winner === "info" ? marketInfo : marketMedia,
    rawScores: { info: scores.info, media: scores.media },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ScoreBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / (max || 1)) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className={`text-xs w-32 text-right ${color}`}>{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <span className={`text-xs w-6 ${color}`}>{pct}%</span>
    </div>
  );
}

// ─── Result view ──────────────────────────────────────────────────────────────
function ResultView({ scores, onRestart }: { scores: Scores; onRestart: () => void }) {
  const r = getDetailedResult(scores);
  const isInfo = r.winner === "info";

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Hero card */}
      <div className={`glass-card border rounded-2xl p-8 space-y-5 ${isInfo ? "border-blue-500/20 bg-blue-500/5" : "border-purple-500/20 bg-purple-500/5"}`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className={`text-xs uppercase tracking-widest mb-2 ${isInfo ? "text-blue-400" : "text-purple-400"}`}>
              Recommandation principale
            </p>
            <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isInfo ? "from-blue-400 to-sky-300" : "from-purple-400 to-pink-300"}`}>
              {isInfo ? "CFC Informatique" : "CFC Médiamatique"}
            </h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-md">
              {isInfo
                ? "Ton profil montre une affinité forte pour la logique, les systèmes et la construction — les piliers du développement."
                : "Ton profil montre une affinité naturelle pour la créativité, la communication et l'impact visuel — les piliers de la médiamatique."}
            </p>
          </div>
          <div className="text-center">
            <div className={`text-5xl font-black ${isInfo ? "text-blue-400" : "text-purple-400"}`}>
              {isInfo ? r.compat.infoPercent : r.compat.mediaPercent}%
            </div>
            <p className="text-gray-600 text-xs mt-1">compatibilité</p>
          </div>
        </div>

        {/* Compatibility bars */}
        <div className="space-y-2.5 pt-2">
          <ScoreBar label="Informatique" value={r.compat.infoPercent} max={100} color="text-blue-400" />
          <ScoreBar label="Médiamatique" value={r.compat.mediaPercent} max={100} color="text-purple-400" />
        </div>
      </div>

      {/* Personality cards (side by side on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* DISC */}
        <div className={`glass-card border rounded-2xl p-6 space-y-3 ${r.profile.badge}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{r.profile.emoji}</span>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Profil DISC</p>
              <p className={`font-bold text-sm ${r.profile.color}`}>{r.profile.label}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{r.profile.desc}</p>
        </div>

        {/* MBTI */}
        <div className="glass-card border border-white/10 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧬</span>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Type MBTI</p>
              <p className="font-bold text-sm text-violet-400">{r.mbti} — {r.mbtiProfile.name}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{r.mbtiProfile.desc}</p>
        </div>
      </div>

      {/* Why this choice */}
      <div className="glass-card border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <span>✅</span> Pourquoi {isInfo ? "l'Informatique" : "la Médiamatique"} te correspond
        </h3>
        <div className="space-y-3">
          {r.winnerReasons.slice(0, 4).map((reason, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${isInfo ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                {i + 1}
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">{reason}</p>
            </div>
          ))}
          {r.winnerReasons.length === 0 && (
            <p className="text-gray-500 text-sm">Ton profil montre une légère préférence — tes réponses penchent dans cette direction.</p>
          )}
        </div>
      </div>

      {/* Market analysis */}
      <div className="glass-card border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <span>📊</span> Marché du travail en Suisse — 2026–2031
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "📈", label: "Tendance", val: r.market.trend },
            { icon: "💰", label: "Salaire estimé", val: r.market.salary },
            { icon: "🔥", label: "Spécialités demandées", val: r.market.demand },
            { icon: "⚠️", label: "Impact IA", val: r.market.risk },
          ].map((item) => (
            <div key={item.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-1">
              <p className="text-gray-600 text-xs">{item.icon} {item.label}</p>
              <p className="text-gray-300 text-sm font-medium leading-snug">{item.val}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <p className="text-gray-500 text-xs mb-1">💡 À retenir</p>
          <p className="text-gray-300 text-sm">{r.market.note}</p>
        </div>
      </div>

      {/* What about the other track */}
      {r.loserReasons.length > 0 && (
        <div className="glass-card border border-white/5 rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-gray-400 flex items-center gap-2 text-sm">
            <span>💬</span> Points vers l&apos;autre voie ({isInfo ? "Médiamatique" : "Informatique"})
          </h3>
          <div className="space-y-2">
            {r.loserReasons.slice(0, 2).map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0 mt-2" />
                <p className="text-gray-600 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 text-xs pt-1">Ces signaux montrent une curiosité pour l&apos;autre voie — elle reste accessible et peut compléter la principale.</p>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/contact"
          className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-4 rounded-xl text-white transition-opacity hover:opacity-90 ${isInfo ? "bg-gradient-to-r from-blue-600 to-sky-500" : "bg-gradient-to-r from-purple-600 to-pink-500"}`}
        >
          Découvrir mon profil complet →
        </Link>
        <button
          onClick={onRestart}
          className="flex-1 inline-flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/25 px-6 py-4 rounded-xl transition-colors"
        >
          🔄 Recommencer le quiz
        </button>
      </div>

      <p className="text-gray-700 text-xs text-center pb-4">
        Ce résultat est indicatif — basé sur tes réponses et des modèles psychologiques (DISC, MBTI).
        Il ne remplace pas un bilan d&apos;orientation professionnel.
      </p>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const emptyScores = (): Scores => ({
  info: 0, media: 0,
  disc_d: 0, disc_i: 0, disc_s: 0, disc_c: 0,
  mbti_e: 0, mbti_i: 0,
  mbti_t: 0, mbti_f: 0,
  mbti_s: 0, mbti_n: 0,
  mbti_j: 0, mbti_p: 0,
});

export default function QuizGame() {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Scores>(emptyScores());
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [direction, setDirection] = useState(1);

  const chapter = chapters[chapterIdx];
  const q = chapter.questions[questionIdx];

  // Global progress
  const totalQuestions = chapters.reduce((acc, c) => acc + c.questions.length, 0);
  const answeredBefore = chapters
    .slice(0, chapterIdx)
    .reduce((acc, c) => acc + c.questions.length, 0) + questionIdx;
  const globalProgress = (answeredBefore / totalQuestions) * 100;

  function pick(idx: number) {
    if (selected !== null) return;
    setSelected(idx);

    const pts = q.answers[idx].points;
    const newScores = { ...scores };
    for (const [k, v] of Object.entries(pts)) {
      (newScores[k as keyof Scores] as number) += v as number;
    }

    setTimeout(() => {
      setScores(newScores);
      const nextQIdx = questionIdx + 1;
      if (nextQIdx < chapter.questions.length) {
        setDirection(1);
        setQuestionIdx(nextQIdx);
        setSelected(null);
      } else {
        const nextChapterIdx = chapterIdx + 1;
        if (nextChapterIdx < chapters.length) {
          setDirection(1);
          setChapterIdx(nextChapterIdx);
          setQuestionIdx(0);
          setSelected(null);
        } else {
          setDone(true);
        }
      }
    }, 420);
  }

  function restart() {
    setScores(emptyScores());
    setChapterIdx(0);
    setQuestionIdx(0);
    setSelected(null);
    setDone(false);
  }

  if (done) return <ResultView scores={scores} onRestart={restart} />;

  return (
    <div className="w-full max-w-xl mx-auto space-y-8">
      {/* Global progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs uppercase tracking-widest">
            {chapter.emoji} Chapitre {chapterIdx + 1}/{chapters.length} — {chapter.title}
          </span>
          <span className="text-gray-600 text-xs">{answeredBefore + 1}/{totalQuestions}</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-full"
            animate={{ width: `${globalProgress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {/* Chapter dots */}
        <div className="flex gap-1.5 justify-center">
          {chapters.map((c, i) => (
            <div
              key={c.title}
              className={`h-1 rounded-full transition-all duration-300 ${
                i < chapterIdx ? "bg-violet-500 w-5" : i === chapterIdx ? "bg-blue-400 w-8" : "bg-white/10 w-3"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${chapterIdx}-${questionIdx}`}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="space-y-6"
        >
          {/* Chapter transition label (only on first Q of chapter) */}
          {questionIdx === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-widest"
            >
              <span>{chapter.emoji}</span>
              <span>{chapter.title}</span>
            </motion.div>
          )}

          <h2 className="text-xl md:text-2xl font-bold leading-snug">{q.text}</h2>

          <div className="flex flex-col gap-3">
            {q.answers.map((ans, idx) => {
              const isSelected = selected === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => pick(idx)}
                  disabled={selected !== null}
                  whileHover={selected === null ? { scale: 1.01 } : {}}
                  whileTap={selected === null ? { scale: 0.99 } : {}}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200
                    ${isSelected
                      ? "border-violet-500/60 bg-violet-500/12 text-white shadow-lg shadow-violet-500/10"
                      : selected !== null
                      ? "border-white/5 bg-white/[0.02] text-gray-700 cursor-default"
                      : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white cursor-pointer"
                    }
                  `}
                >
                  <span className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center text-xs transition-all ${
                      isSelected ? "border-violet-400 bg-violet-500/30 text-violet-300" : "border-white/20"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>{ans.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
