import { NextRequest, NextResponse } from "next/server";

const TIMEOUT_MS = 8000;

export async function POST(req: NextRequest) {
  let host: string | undefined;
  try {
    const body = await req.json();
    host = typeof body.host === "string" ? body.host.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!host) {
    return NextResponse.json({ error: "host is required" }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(host.includes("://") ? host : `https://${host}`);
  } catch {
    return NextResponse.json({ error: "Invalid host or URL" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return NextResponse.json(
      { error: "Only http and https are supported" },
      { status: 400 }
    );
  }

  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "CheckServerConnection/1.0 (research honeypot)" },
    });
    clearTimeout(timer);

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      latencyMs: Date.now() - started,
      finalUrl: res.url,
    });
  } catch (err) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : "Request failed";
    return NextResponse.json({
      ok: false,
      latencyMs: Date.now() - started,
      error: message,
    });
  }
}
