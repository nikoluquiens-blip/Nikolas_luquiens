/**
 * État partagé du mode studio (easter egg de l'accueil).
 *
 * Les niveaux audio changent ~60 fois par seconde : ils sont stockés dans un
 * objet mutable lu directement par le canvas de SignalWave à chaque image,
 * plutôt que dans un état React (ce qui provoquerait 60 re-rendus par seconde).
 * Seule l'ouverture / fermeture du mode notifie les composants abonnés.
 */

export const BAND_COUNT = 6;

export const studio = {
  active: false,
  /** true quand le micro est autorisé et analysé */
  micLive: false,
  /** volume global, 0 → 1 */
  level: 0,
  /** énergie par bande de fréquence (graves → aigus), 0 → 1 */
  bands: new Float32Array(BAND_COUNT),
};

type Listener = (active: boolean) => void;
const listeners = new Set<Listener>();

export function setStudioActive(active: boolean) {
  if (studio.active === active) return;
  studio.active = active;
  // Attribut sur <html> : permet d'estomper le contenu de l'accueil en CSS.
  document.documentElement.dataset.studio = active ? "on" : "off";
  listeners.forEach((l) => l(active));
}

export function onStudioChange(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetStudioLevels() {
  studio.micLive = false;
  studio.level = 0;
  studio.bands.fill(0);
}
