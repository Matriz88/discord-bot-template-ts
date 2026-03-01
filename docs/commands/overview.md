# Commands overview

The template includes example slash commands that showcase discord.js capabilities. Each has its own page with a short description and how it works.

- **[\/ping](ping.md)** — Replies with "Pong!" and latency; minimal slash command.
- **[\/echo](echo.md)** — Echoes back a required string option (up to 2000 chars).
- **[\/embed](embed.md)** — Replies with a rich embed (EmbedBuilder: title, description, fields, thumbnail, footer).
- **[\/feedback](feedback.md)** — Opens a modal (form) with subject and message; submit handler uses `buildModal` and `getModalFieldValues`.
- **[\/buttons](buttons.md)** — Sends a message with Primary, Secondary, and Link buttons; click handlers are colocated in the command file.
- **[\/pick](pick.md)** — Sends a string select menu (e.g. choose a fruit); selection handler colocated in the command file.
- **[\/choose](choose.md)** — String option with autocomplete; demonstrates the `autocomplete` callback.

To add your own commands, see [Adding Commands](adding-commands.md).
