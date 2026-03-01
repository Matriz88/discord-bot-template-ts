# Getting Started

TypeScript Discord bot template for slash commands and events.

**Example commands:** `/ping`, `/echo`, `/embed`, `/feedback`, `/buttons`, `/pick`, `/choose`. See [Commands overview](commands/overview.md). To build your own command step by step: [Building a command](building-a-command.md). For builders and helpers: [Reference](reference.md).

## Tech stack

- **Runtime**: Node.js
- **Language**: TypeScript (ES2024, strict)
- **Discord**: [discord.js](https://discord.js.org/) v14
- **Environment**: [dotenvx](https://dotenvx.com/) — `.env` (dev), `.env.prod` (production)

## Repo layout

See [Architecture](architecture.md) for layout and flow.

## Local run

**Development** (tsx, no build):

```shell
npm run dev
```

**Production-like** (build then run):

```shell
npm run build
npm start
```

**Production:** Build with `npm run build`, then run e.g. `node dist/index.js` or use your process manager.

## Invite links

Replace `YOUR_CLIENT_ID` with your app's client ID from the [Discord Developer Portal](https://discord.com/developers/applications).

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147494912&scope=bot%20applications.commands
```

## Version bump

```shell
npm run bump-version -- [major|minor|patch]
```

Example: `npm run bump-version -- minor`.
