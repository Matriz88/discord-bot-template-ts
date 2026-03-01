# /echo

Echoes back a message that the user provides.

## What it does

The user supplies a string option (e.g. "Hello world"). The bot replies with that text, truncated to Discord's message limit (2000 characters). Demonstrates a required string option.

## How it works

- **Data** — `SlashCommandBuilder` with `addStringOption`: name `message`, required, with a description.
- **Execute** — Reads the value with `interaction.options.getString('message')`, slices to 2000 characters, and replies. If the result is empty, replies with "(empty)".

No components or autocomplete; a simple option + reply flow.

## See also

- [Commands overview](commands/overview.md)
- [Adding Commands](commands/adding-commands.md)
