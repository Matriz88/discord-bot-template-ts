# How it works

A short walkthrough of the bot's lifecycle and how interactions are handled.

## Startup

1. **Entry point** — `src/index.ts` reads `DISCORD_TOKEN` and `DISCORD_CLIENTID` from the environment and creates a Discord `Client` with the required intents.
2. **Commands** — `registerCommands(client)` loads every `.ts` file in `src/commands/` and fills `client.commands` (command name → command module). No manual registration: drop a file and it's picked up.
3. **Events** — `registerEvents(client, token, clientId)` loads every `.ts` file in `src/events/` and attaches each module's handler to the client (e.g. `ClientReady`, `InteractionCreate`).
4. **Login** — `client.login(token)` connects to Discord.
5. **Ready** — When the client is ready, the `ready` event runs once and calls `deployCommands()`, which pushes the current set of slash commands (from `client.commands`) to Discord's API. That is when your slash commands appear in the client.

## When a user runs a slash command

1. Discord sends an **InteractionCreate** event.
2. The handler in `src/events/interactionCreate.ts` receives it. For chat input commands (and autocomplete), it looks up the command by name in `client.commands`.
3. For a normal invocation it calls `command.execute(interaction)`; for autocomplete it calls `command.autocomplete(interaction)` if the command defines it.
4. If execution throws, the handler catches the error and replies to the user with an ephemeral error message via `replyOrEditError`.

## When a user submits a modal, clicks a button, or selects from a menu

1. Same **InteractionCreate** event; the interaction type is modal submit, button, or string select menu.
2. The handler routes by **customId**: it looks up the handler in `COMPONENT_HANDLERS` (in `src/interactions/componentHandlers.ts`). Those handlers are implemented in the command files (e.g. feedback, buttons, pick) and registered there.
3. The matching handler runs; errors are caught and reported the same way (ephemeral reply).

For more detail — diagrams, key types, and file roles — see [Architecture](architecture.md).
