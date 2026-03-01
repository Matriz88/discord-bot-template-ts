# Best practices

## Security

- Do not commit secrets; keep `.env` and `.env.prod` out of version control.
- Keep Discord token and client ID only in environment variables.

## Environment and config

- Provide a `.env.example` with placeholder keys. See [Configuration](configuration.md).
- Use `getEnv()` from [`src/utils/config.ts`](../src/utils/config.ts) for required env vars.

## Code style and quality

- TypeScript strict mode; type commands/events with `DiscordCommand` and `DiscordEvent` from [`src/@types/discordbot.ts`](../src/@types/discordbot.ts).
- Run **`npm run lint`** / **`npm run lint:fix`** (use these scripts only, not raw eslint/prettier).
- Prefer `type` over `interface` for object shapes.
- Use `node:` protocol for Node built-ins (e.g. `node:fs`, `node:path`).
- English only in code, comments, and user-facing strings.
- Comments only when they add value; avoid restating the code.

## Discord bot

- Slash commands: use `deferReply()` for slow operations; reply with ephemeral errors on failure.
- Events: implement `DiscordEvent`; use `once: true` for one-off (e.g. `ready`).
- Request only the intents you need.

## Operations

- Use `console.log` / `console.error` with error object when relevant.
- Use `npm run bump-version` and keep version in sync with releases.

## Dependencies

- Use latest stable versions and current best practices.
- Before adding or changing a dependency, check official docs and release notes.

## Testing

No automated test suite. Manually test: invite the bot, run `/ping`, `/echo`, `/buttons`, `/feedback`, etc., to verify commands and component handlers.
