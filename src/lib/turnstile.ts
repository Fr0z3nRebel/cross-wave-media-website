import { NextRequest } from "next/server";

const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(
  token: string | undefined,
  ip: string | null,
): Promise<boolean> {
  // Skip Turnstile verification in development (localhost, etc.)
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return false;
  if (!token) return false;

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) return false;

  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

export function getClientIp(request: NextRequest): string | null {
  const header =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip");

  if (header) {
    const ip = header.split(",")[0]?.trim();
    if (ip) return ip;
  }

  // NextRequest.ip may be populated in some runtimes.
  // @ts-expect-error: ip is not always typed on NextRequest.
  if (request.ip && typeof request.ip === "string") {
    // @ts-expect-error
    return request.ip;
  }

  return null;
}

