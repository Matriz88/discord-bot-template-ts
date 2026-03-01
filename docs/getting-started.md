# Getting Started

## Purpose

This is a TypeScript Discord bot template. Use it as a base to add your own slash commands and events.

## Example commands

The template includes example slash commands that showcase discord.js capabilities:

- **`/embed`** — Replies with a rich embed (EmbedBuilder: title, description, fields, thumbnail, footer).
- **`/feedback`** — Opens a modal (form) with subject and message fields; the submit handler is colocated in the command file and uses `buildModal` and `getModalFieldValues` from `src/interactions/builders.ts`.
- **`/buttons`** — Sends a message with Primary, Secondary, and Link buttons; the click handler is colocated in the command file.
- **`/pick`** — Sends a string select menu (e.g. choose a fruit); the selection handler is colocated in the command file.
- **`/choose`** — String option with autocomplete; demonstrates the `autocomplete` callback.
- **`/ping`**, **`/echo`** — Simple slash command examples.

See [Commands overview](commands/overview.md) for more detail.

## Tech stack

- **Runtime**: Node.js
- **Language**: TypeScript (ES2024, strict mode)
- **Discord**: [discord.js](https://discord.js.org/) v14
- **Environment**: [dotenvx](https://dotenvx.com/) (`.env` for dev, `.env.prod` for production)

Add other dependencies (e.g. HTTP clients) as needed for your commands. There is no prescribed process manager; you choose how to run the bot.

## Repo layout (high level)

- **`src/`** — All application code
  - **`index.ts`** — Entry point: creates the Discord client, registers commands and events, logs in.
  - **`commands/`** — Slash command modules; auto-loaded at startup.
  - **`events/`** — Discord event handlers (e.g. `ready`, `interactionCreate`); auto-loaded at startup.
  - **`interactions/`** — UI builders (modals, buttons, select menus) in `builders.ts`; error helper in `helpers.ts`; component handler registry in `componentHandlers.ts` (imports from commands).
  - **`utils/`** — Helpers: config (env), meta (`__dirname` for ESM), registerers (load commands/events from disk).
  - **`@types/`** — TypeScript definitions for the custom client, commands, and events.
- **Configuration** — Environment variables (see [Configuration](configuration.md)); no config files in repo for secrets.

For how startup and command/event flow work in detail, see [Architecture](architecture.md).

## Local run

**Development** (with tsx, no build step):

```shell
npm run dev
```

**Production-like** (build then run with Node):

```shell
npm run build
npm start
```

## Running in production

Build with `npm run build`, then run the bot however you prefer: e.g. `node dist/index.js` directly, or use your own process manager, container, or hosting.

## Invite links

Use this URL to invite the bot to a server. Replace `YOUR_CLIENT_ID` with your application's client ID from the [Discord Developer Portal](https://discord.com/developers/applications).

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147494912&scope=bot%20applications.commands
```

Scope includes `bot` and `applications.commands` so the bot can receive messages and register slash commands.

## Version bump

To update the version in `package.json`:

```shell
npm run bump-version -- [major|minor|patch]
```

Example: `npm run bump-version -- minor` for the next minor version.
