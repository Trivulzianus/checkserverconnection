# Honeypot research design

This repository tests whether public fake credentials and natural-language instructions are picked up by automated systems (scrapers, validators, or language-model agents).

## Arms

| Arm | Location | Expected responder |
|-----|----------|-------------------|
| Fake API key | `README.md`, `.env.example` | Secret scanners, leak validators |
| NL beacon | `NOTICE.md`, `/notice` | Readers that follow prose (agents, triage LLMs) |
| Hash proof | Beacon POST with `proof` | Anything that hashed the exact canary string |

## Beacon

- **Endpoint:** `POST /api/beacon`
- **Logs:** Vercel → Project → Logs, filter `[beacon]`
- **Fields logged:** time, `canary_id`, `valid`, user-agent, forwarded IP (no request body storage beyond validation)

## Ethics

- Keys use the `sk-canary-` prefix and are documented as fake.
- Instructions explicitly forbid exfiltrating user data.
- Purpose is documented in README and repo description.

## Interpreting results

- Hit within minutes of push + generic UA → likely automated scanner.
- Valid `notice-nl` ack → something read and followed NL instructions (not proof of a specific model).
- Valid hash arm without NL → likely secret-focused automation.
