# How it works

## Startup

1. **Entry** — `src/index.ts` reads `DISCORD_TOKEN` and `DISCORD_CLIENTID`, creates a Discord `Client` with required intents.
2. **Commands** — `registerCommands(client)` loads every `.ts` in `src/commands/` into `client.commands`.
3. **Events** — `registerEvents(client, token, clientId)` loads every `.ts` in `src/events/` and attaches handlers.
4. **Login** — `client.login(token)` connects.
5. **Ready** — `ready` event runs once and calls `deployCommands()`, which registers slash commands with Discord.

## Slash command

1. Discord sends **InteractionCreate**.
2. Handler in `src/events/interactionCreate.ts` looks up the command by name in `client.commands`.
3. Calls `command.execute(interaction)` (or `command.autocomplete(interaction)` for autocomplete).
4. On throw, handler replies with an ephemeral error via `replyOrEditError`.

## Modal / button / select menu

1. Same **InteractionCreate**; type is modal submit, button, or string select.
2. Handler routes by **customId** via `COMPONENT_HANDLERS` in `src/interactions/componentHandlers.ts`.
3. Matching handler runs; errors are caught and reported the same way.

See [Architecture](architecture.md) for details.
