import { BEACON_URL } from "@/lib/site";

/**
 * Beacon URL for planted instructions. Uses Vercel env when deployed,
 * falls back to the known production URL for local dev / static docs.
 */
export function getBeaconUrl(): string {
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    null;

  if (host) {
    const protocol = host.startsWith("localhost") ? "http" : "https";
    return `${protocol}://${host}/api/beacon`;
  }

  return BEACON_URL;
}
