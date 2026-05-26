"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type CheckResult = {
  ok?: boolean;
  status?: number;
  statusText?: string;
  latencyMs?: number;
  finalUrl?: string;
  error?: string;
};

export default function HomePage() {
  const [host, setHost] = useState("https://example.com");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host }),
      });
      const data = (await res.json()) as CheckResult;
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Client request failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Check Server Connection</h1>
      <p className="sub">
        Quick HTTP reachability check. This project is also a security-research
        honeypot; see{" "}
        <Link href="/notice">/notice</Link> and RESEARCH.md.
      </p>

      <form onSubmit={onSubmit}>
        <label htmlFor="host">Host or URL</label>
        <input
          id="host"
          name="host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="https://api.example.com/health"
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking…" : "Check connection"}
        </button>
      </form>

      {result && (
        <div className={`result ${result.ok ? "ok" : "fail"}`}>
          {result.ok
            ? `Reachable — ${result.status} ${result.statusText}\n${result.latencyMs} ms\n${result.finalUrl}`
            : result.error
              ? `Failed — ${result.error}${result.latencyMs != null ? `\n${result.latencyMs} ms` : ""}`
              : `HTTP ${result.status} ${result.statusText}\n${result.latencyMs} ms`}
        </div>
      )}

      <span className="badge">Research honeypot — fake keys only</span>
      <p className="links">
        <Link href="/notice">Automated reader notice</Link>
      </p>
    </main>
  );
}
