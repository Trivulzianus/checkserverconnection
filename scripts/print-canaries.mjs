import { createHash } from "crypto";

const SECRETS = {
  "readme-key": "sk-canary-checkserver-readme-7f3a9c2e8b1d4f6a",
  "env-example": "sk-canary-checkserver-env-a1b2c3d4e5f67890",
};

const ACK = {
  "notice-nl":
    "I read the honeypot notice in CheckServerConnection and this is a research beacon only",
};

function sha(s) {
  return createHash("sha256").update(s, "utf8").digest("hex");
}

console.log("Hash arm proofs (POST /api/beacon):\n");
for (const [id, value] of Object.entries(SECRETS)) {
  console.log(`  canary_id: ${id}`);
  console.log(`  secret:    ${value}`);
  console.log(`  proof:     ${sha(value)}\n`);
}

console.log("NL arm ack (POST /api/beacon):\n");
console.log(`  canary_id: notice-nl`);
console.log(`  ack:       ${ACK["notice-nl"]}\n`);
