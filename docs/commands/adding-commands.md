# Adding commands

Quick checklist. For a full walkthrough, see [Building a command](../building-a-command.md).

## Simple command

1. Create a new file in `src/commands/` (e.g. `mycommand.ts`).
2. Export a default object with `data` (SlashCommandBuilder: name, description) and `execute(interaction)`. Optionally add `autocomplete(interaction)`.
3. Restart the bot; the template loads the file and `deployCommands()` registers it with Discord when ready.

Type: `DiscordCommand` in [`src/@types/discordbot.ts`](../src/@types/discordbot.ts). See [Building a command](../building-a-command.md) or [Ping](ping.md) for a minimal example.

## Command with components (modal, buttons, select)

1. In the command file: define and export **customIds** for the modal/button/select (and fields if modal).
2. In `execute`: build the UI with builders from `src/interactions/builders.ts` (`buildModal`, `buildButtonRow`, `buildStringSelect`) and show the modal or reply with components.
3. Implement and export a **handler** that runs when the user submits/clicks/selects (e.g. use `getModalFieldValues` for modals).
4. In `src/interactions/componentHandlers.ts`: import the handler and customId(s), and add entries to `COMPONENT_HANDLERS`.

See [Building a command](../building-a-command.md) or [Feedback](feedback.md), [Buttons](buttons.md), [Pick](pick.md). Builder and helper APIs: [Reference](../reference.md).

## See also

- [Building a command](../building-a-command.md) — step-by-step tutorial
- [Reference](../reference.md) — builders, helpers, config
- [Architecture](../architecture.md) — layout and flow
- [Commands overview](overview.md) — example commands
