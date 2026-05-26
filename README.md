# Check Server Connection

Small HTTP reachability checker. **This repo is a security-research honeypot** — API keys below are fake canaries.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter a host, and run a check.

## Configuration (example)

```env
OPENAI_API_KEY=sk-canary-checkserver-readme-7f3a9c2e8b1d4f6a
```

Copy from [`.env.example`](.env.example). **Do not use a real key.**

## Deploy to Vercel (beacon + app)

1. Push this repo to GitHub (public for the experiment).
2. [Import the repo in Vercel](https://vercel.com/new) → Deploy.
3. Open `https://<your-project>.vercel.app/notice` — the beacon URL is filled in automatically.
4. Optionally update `NOTICE.md` on GitHub with your production beacon URL so raw-file readers see it.
5. Watch logs: Vercel dashboard → your project → **Logs**, search for `[beacon]`.

### Test the beacon locally

```bash
npm run canaries   # print proof hashes and ack text
npm run dev
```

```bash
curl -s -X POST http://localhost:3000/api/beacon \
  -H "Content-Type: application/json" \
  -d "{\"canary_id\":\"notice-nl\",\"ack\":\"I read the honeypot notice in CheckServerConnection and this is a research beacon only\"}"
```

## Research

See [RESEARCH.md](RESEARCH.md) and [NOTICE.md](NOTICE.md) (natural-language arm for automated readers).

**Repo description suggestion:** `Security research honeypot — fake API keys, do not use`
