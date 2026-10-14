import { NextResponse } from "next/server";

// Endpoint tiers (Web3Forms) — la clé d'accès reste ici, côté serveur,
// et ne doit jamais être préfixée NEXT_PUBLIC_ (voir .env.example).
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  entreprise?: unknown;
  message?: unknown;
};

function sanitizeField(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_KEY;

  // Garde-fou : sans clé configurée côté serveur, on échoue proprement
  // plutôt que d'envoyer une requête vouée à être rejetée par Web3Forms.
  if (!accessKey) {
    console.error("[contact] WEB3FORMS_KEY absente des variables d'environnement serveur");
    return NextResponse.json(
      { success: false, message: "Le formulaire est momentanément indisponible." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Requête invalide." }, { status: 400 });
  }

  const name = sanitizeField(body.name, MAX_NAME_LENGTH);
  const email = sanitizeField(body.email, MAX_NAME_LENGTH);
  const entreprise = sanitizeField(body.entreprise, MAX_NAME_LENGTH);
  const message = sanitizeField(body.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Merci de renseigner un nom, un email valide et un message." },
      { status: 400 }
    );
  }

  // IP à titre indicatif pour la journalisation (repérage d'abus/spam),
  // pas utilisée pour de la logique métier.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  try {
    const web3formsRes = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        entreprise,
        message,
        subject: `Contact portfolio — ${name}`,
        from_name: "Portfolio Nikolas",
      }),
    });

    const json = await web3formsRes.json();

    if (json.success) {
      console.log(`[contact] message envoyé — ip=${ip} at=${new Date().toISOString()}`);
      return NextResponse.json({ success: true });
    }

    console.error(`[contact] refus Web3Forms — ip=${ip} response=${JSON.stringify(json)}`);
    return NextResponse.json(
      { success: false, message: "L'envoi a échoué, réessaie." },
      { status: 502 }
    );
  } catch (error) {
    console.error(`[contact] erreur réseau vers Web3Forms — ip=${ip}`, error);
    return NextResponse.json(
      { success: false, message: "L'envoi a échoué, réessaie." },
      { status: 502 }
    );
  }
}
