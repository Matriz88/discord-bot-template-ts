# Adding commands

## Adding a command

1. Create a new file in `src/commands/` (e.g. `mycommand.ts`).
2. Export a default object that implements `DiscordCommand`:
   - `data`: a `SlashCommandBuilder` with name, description, and options.
   - `execute(interaction)`: async function that handles the command.
   - `autocomplete(interaction)` (optional): if the command has options that support autocomplete.
3. The registerer will pick it up automatically on the next start; `deployCommands()` will register it with Discord when the bot becomes ready.

Key types are defined in `src/@types/discordbot.ts`. For startup and registration flow, see [Architecture](../architecture.md).

## Adding a command that uses components

1. Create the command file in `src/commands/`. Define your customIds in that file. In `execute`, build the UI using the builders from `src/interactions/builders.ts` (e.g. `buildModal`, `buildButtonRow`, `buildStringSelect`). Implement and export the submit/click/select handler in the same file (e.g. use `getModalFieldValues` for modals; for buttons/select, write an async function that reads the interaction and replies).
2. In `src/interactions/componentHandlers.ts`, import the handler and customId(s) from the new command and add the corresponding entries to `COMPONENT_HANDLERS`.

Example commands that use these flows: **embed** (EmbedBuilder only), **feedback** (modal), **buttons** (buttons), **pick** (select menu), **choose** (autocomplete).
