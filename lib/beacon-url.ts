/**
 * Production beacon URL for planted instructions.
 * VERCEL_PROJECT_PRODUCTION_URL is set on Vercel (e.g. my-app.vercel.app).
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

  return "https://YOUR_PROJECT.vercel.app/api/beacon";
}
