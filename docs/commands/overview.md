# Commands overview

Example slash commands live in `src/commands/`. Each has a short doc below.

- **[\/ping](ping.md)** — Replies with "Pong!" and latency.
- **[\/echo](echo.md)** — Echoes back a required string option (up to 2000 chars).
- **[\/embed](embed.md)** — Rich embed (EmbedBuilder: title, description, fields, thumbnail, footer).
- **[\/feedback](feedback.md)** — Modal with subject and message; submit handler uses `buildModal` and `getModalFieldValues`.
- **[\/buttons](buttons.md)** — Primary, Secondary, and Link buttons; click handlers colocated in the command file.
- **[\/pick](pick.md)** — String select menu (e.g. choose a fruit); selection handler colocated.
- **[\/choose](choose.md)** — String option with autocomplete; demonstrates `autocomplete` callback.

To add your own: [Building a command](../building-a-command.md) (tutorial) or [Adding commands](adding-commands.md) (checklist).
