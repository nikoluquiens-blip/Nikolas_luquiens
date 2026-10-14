"use client";
import { usePathname } from "next/navigation";
import CTASection from "./CTASection";

// Le CTA de recrutement ("Votre prochain apprenti...") ne colle pas au ton
// sobre attendu des pages légales — on le masque spécifiquement là.
const HIDDEN_ON = ["/mentions-legales", "/confidentialite"];

export default function ConditionalCTA() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <CTASection />;
}
