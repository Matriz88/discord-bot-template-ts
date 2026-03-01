# Best practices

Guidelines for developing and operating your bot based on this template.

## Security

- **Do not commit secrets.** Keep `.env` and `.env.prod` out of version control (add them to `.gitignore` if not already).
- **Discord token and client ID** — Keep them only in environment variables (already the case in this project).

## Environment and config

- **Provide a `.env.example`** with placeholder keys (e.g. `DISCORD_TOKEN=`, `DISCORD_CLIENTID=`) so new contributors know what to set. Document it in [Configuration](configuration.md).
- **Use `getEnv()`** from [`src/utils/config.ts`](../src/utils/config.ts) for required env vars so the app fails fast with a clear error instead of failing later with an undefined value.

## Code style and quality

- **TypeScript** — The project uses strict mode ([`tsconfig.json`](../tsconfig.json)). Type commands and events with `DiscordCommand` and `DiscordEvent` from [`src/@types/discordbot.ts`](../src/@types/discordbot.ts).
- **ESLint and Prettier** — The project uses [eslint.config.mjs](../eslint.config.mjs) (TypeScript + Prettier). Use the recommended VSCode formatter (Prettier) and run **`npm run lint`** to check, or **`npm run lint:fix`** to fix, before committing. Run ESLint and Prettier **only via these package.json scripts** — do not run `eslint` or `prettier` independently with custom commands.
- **Prefer `type` over `interface`** for object shapes, as per the project's ESLint rule.
- **Use the `node:` protocol** for Node built-ins (e.g. `node:fs`, `node:path`) where applicable, as in [`src/utils/registerers.ts`](../src/utils/registerers.ts).
- **Language** — Use **English only** in source code, comments, JSDoc, and user-facing strings (e.g. slash command descriptions and error messages). Do not use other languages in code or comments.
- **Comments** — Add comments only when they add value (e.g. explain non-obvious behavior, document a module's purpose, or reference external docs). Omit comments that merely restate what the code does. Prefer short, single-line comments or JSDoc where appropriate; avoid redundant `@param`/`@returns` when the signature is clear.

## Discord bot

- **Slash commands** — Define commands with `SlashCommandBuilder` and implement `execute`. For slow operations (e.g. calling an external API), use `deferReply()` so Discord doesn't timeout. Handle errors and reply with an ephemeral message, as in [`src/events/interactionCreate.ts`](../src/events/interactionCreate.ts).
- **Events** — Implement the `DiscordEvent` shape. Use `once: true` for one-off setup (e.g. `ready`).
- **Intents** — Request only the intents you need (`Guilds`, `GuildMessages` in this project) to reduce privilege and avoid future breaking changes.

## Operations

- **Logging** — Use `console.log` for important actions. Use `console.error` for failures and include the error object when relevant.
- **Versioning** — Use `npm run bump-version` and keep the version in [`package.json`](../package.json) in sync with releases.

## Dependencies and latest practices

- Use **latest stable versions** and **current best practices** for all project dependencies (discord.js, TypeScript, Node, dotenvx, etc.).
- Before adding a new dependency: look up the latest version and the library's official documentation and recommended usage; add the latest compatible version to the project.
- Before planning or implementing changes that touch a framework or library: check online (official docs, release notes, community guidelines) for the latest best practices and versions so recommendations and code stay current.

## Testing

The project does not currently include an automated test suite. Rely on manual testing:

- Invite the bot to a development server and exercise your slash commands and component handlers (e.g. run `/ping`, `/echo`, and try component commands like `/buttons` or `/feedback`) to verify they work as expected.
