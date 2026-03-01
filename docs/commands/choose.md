# /choose

Lets the user pick an item from a list using **autocomplete**: as they type, the bot suggests matching options.

## What it does

The command has one required string option, `item`, with autocomplete enabled. When the user focuses that option, Discord asks the bot for suggestions; the bot filters a fixed list (Sword, Shield, Potion, Key, Map) by what the user has typed and returns up to 25 choices. When the user selects one and runs the command, the bot replies with "You chose: **value**". Demonstrates the `autocomplete` callback on a command.

## How it works

- **Data** — `SlashCommandBuilder` with `addStringOption(..., setAutocomplete(true))` for the `item` option.
- **Execute** — Runs when the user submits the command. Reads `interaction.options.getString('item', true)` and replies with the chosen value.
- **Autocomplete** — When the user is typing in the option, Discord sends an autocomplete interaction. The `interactionCreate` handler calls `command.autocomplete(interaction)`. The command's `autocomplete` implementation gets the focused value with `interaction.options.getFocused()`, filters `ITEM_OPTIONS` by that string (case-insensitive), slices to 25 items, and calls `interaction.respond()` with `{ name, value }` for each choice.

No modals or components; the flow is slash command + autocomplete only.

## See also

- [Commands overview](overview.md)
- [Adding Commands](adding-commands.md)
- [Architecture](../architecture.md) (command flow, autocomplete)
