const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  errors?: Record<string, string>;
  error?: string;
}

export async function fetchContent<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { ok: false, errors: body.errors, error: body.error ?? "Falha ao enviar mensagem." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Não foi possível conectar ao servidor. Tente novamente." };
  }
}
