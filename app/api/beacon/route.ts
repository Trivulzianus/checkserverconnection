import { validateBeacon } from "@/lib/canaries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: {
    canary_id?: string;
    proof?: string;
    ack?: string;
    starred?: boolean;
  } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const result = validateBeacon(body);

  const event = {
    at: new Date().toISOString(),
    canary_id: body.canary_id ?? null,
    arm: result.arm,
    valid: result.valid,
    starred: body.starred === true,
    user_agent: req.headers.get("user-agent"),
    forwarded_for: req.headers.get("x-forwarded-for"),
    referer: req.headers.get("referer"),
    content_length: req.headers.get("content-length"),
  };

  console.log("[beacon]", JSON.stringify(event));

  return NextResponse.json({
    ok: true,
    received: true,
    valid: result.valid,
  });
}

export async function GET() {
  return NextResponse.json({
    service: "check-server-connection honeypot beacon",
    method: "POST",
    body: {
      hash_arm: {
        canary_id: "readme-key | env-example",
        proof: "sha256 hex of the exact fake sk-canary-... string",
      },
      nl_arm: {
        canary_id: "notice-nl",
        ack: "exact sentence from NOTICE.md",
        starred: "optional boolean, honor system",
      },
    },
    disclaimer: "Security research honeypot. Keys are fake.",
  });
}
