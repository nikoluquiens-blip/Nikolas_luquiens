# Instructions du projet — Portfolio Nikolas Luquiens

Stack : Next.js 15 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · `motion` (Framer Motion).

## Contexte

Ce projet doit avoir l'air d'avoir été conçu et développé par une équipe de développeurs et designers professionnels, pas généré rapidement par une IA. Chaque décision (design, architecture, contenu) doit être justifiable. Si un choix ne peut pas être expliqué, ne pas le faire par défaut : poser la question ou proposer des alternatives.

## Avant de coder

- Ne jamais commencer à écrire du code directement sur une demande de fonctionnalité un peu large. Proposer d'abord un plan bref (structure, choix techniques, arborescence) et attendre validation.
- Si une spécification est ambiguë, demander une précision plutôt que de deviner et de foncer.
- Réfléchir à l'architecture avant l'implémentation : découpage en composants/modules, responsabilités claires, pas de fichier fourre-tout de 800 lignes.

## Design UI

**À éviter :**
- Dégradés violet/bleu génériques
- Hero section avec titre centré + sous-titre + deux boutons arrondis
- Cartes avec ombre portée identique partout
- Icônes emoji à la place d'une vraie iconographie
- Police par défaut (Inter partout) sans réflexion
- `transition: all 0.3s` collé partout sans intention

**À faire :**
- Choisir une direction artistique cohérente et justifiée (palette, typographie, style d'espacement) et la respecter sur toutes les pages
- Densité et hiérarchie visuelle réfléchies, pas un simple empilement de blocs centrés
- Micro-interactions et transitions intentionnelles (le projet utilise déjà `motion` — s'appuyer dessus plutôt que du CSS générique)
- Vraie cohérence responsive (mobile / tablette / desktop), pas juste un flex-wrap qui casse au redimensionnement

## Contenu

- Pas de texte placeholder (Lorem ipsum, "Titre incroyable", "Découvrez notre solution innovante") qui traîne dans le code final
- Le contenu doit être spécifique à Nikolas et à son parcours réel, pas générique et interchangeable avec n'importe quel autre portfolio

## Code & architecture

- Nommage clair et cohérent (fichiers, variables, fonctions) — pas de `data2.js`, `handleClick1`, `temp`
- Séparation des responsabilités : logique métier / UI / accès aux données bien distincts
- Gestion d'erreurs réelle (try/catch pertinents, messages utiles), pas de `catch(e){}` vide
- Pas de duplication copié-collé entre composants ; factoriser dès que le pattern se répète 2-3 fois
- Commenter le pourquoi, pas le quoi évident
- Respecter les conventions du projet (ESLint config existante, TypeScript strict)

## Robustesse

- Gérer les états de chargement, vides et d'erreur dans l'UI, pas seulement le happy path
- Valider les entrées utilisateur côté client ET serveur si applicable (formulaires de contact, etc.)
- Accessibilité de base : contrastes suffisants, attributs `alt`, navigation clavier, labels de formulaire

## Process de travail

- Après chaque fonctionnalité importante, faire un résumé court des choix pris, pas juste "c'est fait"
- Signaler explicitement toute dette technique ou raccourci pris faute de temps
- Signaler si une demande risque de dégrader la cohérence du design ou de l'architecture existante, et proposer une alternative

## Site déjà existant

Ce projet est déjà développé — pas un démarrage from scratch.

- Avant toute modification, faire un audit rapide : repérer les patterns génériques restants (design et code), les incohérences visuelles, le texte placeholder oublié, la dette technique visible
- Prioriser les corrections qui ont le plus d'impact perçu (ce que les visiteurs remarquent en premier) avant les détails internes
- Ne pas tout réécrire d'un coup : proposer une liste de correctifs priorisée et avancer par petites itérations validées
