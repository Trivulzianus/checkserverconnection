# Check Server Connection

Simple HTTP reachability checker. Enter a host or URL and see whether it responds, with status code and latency.

**Live app:** [checkserverconnection.vercel.app](https://checkserverconnection.vercel.app/)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter a host, and run a check.

## Configuration

Create `.env` from the example file:

```bash
cp .env.example .env
```

```env
OPENAI_API_KEY=sk-canary-checkserver-readme-7f3a9c2e8b1d4f6a
```

## API

`POST /api/check` with JSON body:

```json
{ "host": "https://checkserverconnection.vercel.app" }
```

Returns `ok`, `status`, `latencyMs`, and related fields.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
