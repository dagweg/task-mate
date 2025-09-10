export async function getAppToken(): Promise<string | null> {
  try {
    const r = await fetch("/api/token");
    if (!r.ok) return null;
    const { token } = await r.json();
    return token as string;
  } catch {
    return null;
  }
}

export async function fetchWithAppToken(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const token = await getAppToken();
  const headers = new Headers(init?.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}
