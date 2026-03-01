# Configuration

## Environment variables

The bot expects these variables (see `src/utils/config.ts` and `src/index.ts`):

| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Bot token from the [Discord Developer Portal](https://discord.com/developers/applications). |
| `DISCORD_CLIENTID` | Application (client) ID of the bot. |

## Environment files

- **`.env`** — Used for local development (loaded by `npm run dev` via dotenvx).
- **`.env.prod`** — Used for production (e.g. `npm start`).
- Do not commit these files. Add a **`.env.example`** with placeholder keys (no real values) so others know what to set; see [Best practices](best-practices.md).

## Using getEnv()

Use `getEnv()` from `src/utils/config.ts` for required env vars so the app fails fast with a clear error instead of failing later with an undefined value.
