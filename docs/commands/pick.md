# /pick

Shows a string select menu (dropdown) of fruits; the user picks one and the bot replies with the choice.

## What it does

The bot sends a message with a single select menu listing fruits (Apple, Banana, Cherry, etc.). The user selects one (min and max selections are 1). The bot replies ephemerally with "You chose: **value**". Demonstrates `buildStringSelect` and a select-menu handler.

## How it works

- **Data** — `SlashCommandBuilder` for `/pick`; no options (the choice is made in the menu).
- **Execute** — Builds options (label/value pairs), then `buildStringSelect(PICK_FRUIT, 'Choose a fruit', PICK_OPTIONS, 1, 1)` for min/max 1. Replies with `content` and `components: [row]`.
- **Handler** — `handlePickFruit` is registered in `componentHandlers.ts` under `PICK_FRUIT`. It checks `interaction.isStringSelectMenu()`, reads `interaction.values` (array of selected values), and replies ephemerally with the chosen value(s).

CustomId and handler are exported from the command file; `componentHandlers.ts` maps `PICK_FRUIT` to `handlePickFruit`.

## See also

- [Commands overview](overview.md)
- [Adding Commands](adding-commands.md) (including "Adding a command that uses components")
- [Architecture](../architecture.md) (component flow)
