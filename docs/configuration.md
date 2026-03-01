# Configuration

## Environment variables

| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Bot token from the [Discord Developer Portal](https://discord.com/developers/applications). |
| `DISCORD_CLIENTID` | Application (client) ID of the bot. |

## Environment files

- **`.env`** — Local development (loaded by `npm run dev`).
- **`.env.prod`** — Production (e.g. `npm start`).
- **`.env.example`** — Placeholder keys; do not commit real values. See [Best practices](best-practices.md).

Example `.env.example`:

```env
DISCORD_TOKEN=
DISCORD_CLIENTID=
```

## Using getEnv()

Use `getEnv()` from `src/utils/config.ts` for required vars so the app fails fast if missing:

```typescript
import { getEnv } from './utils/config.js';

const token = getEnv('DISCORD_TOKEN');
const clientId = getEnv('DISCORD_CLIENTID');
```

Full list of helpers and builders: [Reference](reference.md).
