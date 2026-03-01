# /ping

Replies with "Pong!" and the round-trip latency in milliseconds.

## What it does

A minimal slash command: no options, just an immediate reply. Useful as a health check or to see how long Discord took to deliver the interaction.

## How it works

- **Data** — `SlashCommandBuilder` with `name: 'ping'` and a short description.
- **Execute** — Computes latency as `Date.now() - interaction.createdTimestamp`, then replies with `Pong! (Xms)`.

No components, modals, or autocomplete; the interaction is handled entirely in `execute`.

## See also

- [Commands overview](commands/overview.md)
- [Adding Commands](commands/adding-commands.md)
