# Discord Bot Template

A **TypeScript** Discord bot template with slash commands and events. Clone it, add your commands, and go live with [discord.js](https://discord.js.org/) v14 and Node.js.

---

## Get going in three steps

1. **[Configure](configuration.md)** — Set `DISCORD_TOKEN` and `DISCORD_CLIENTID` in `.env`.
2. **Run** — `npm run dev` and invite the bot using the [invite link](getting-started.md#invite-links).
3. **Build a command** — Follow the [step-by-step tutorial](building-a-command.md) to add your first slash command (and optionally a modal or buttons).

> **New to Discord bots?** Start with [Getting Started](getting-started.md), then [How it works](how-it-works.md) for a plain-language walkthrough of startup and interactions.

---

## What’s in the box

- **Slash commands** — Auto-loaded from `src/commands/`; deployed to Discord on ready.
- **Modals, buttons, select menus** — Helpers in `src/interactions/builders.ts`; route by `customId` in `componentHandlers.ts`.
- **Events** — Drop a file in `src/events/` and it’s attached to the client.
- **Strict TypeScript** — Typed commands and events via `src/@types/discordbot.ts`.

---

## Where to go next

| You want to… | Go here |
| ------------ | ------- |
| Run the bot and invite it | [Getting Started](getting-started.md) |
| Understand startup and interaction flow | [How it works](how-it-works.md) |
| Add a command (tutorial) | [Building a command](building-a-command.md) |
| Add a command (checklist) | [Adding commands](commands/adding-commands.md) |
| See example commands | [Commands overview](commands/overview.md) |
| Look up builders and helpers | [Reference](reference.md) |
| See the big picture | [Architecture](architecture.md) |
