# /embed

Replies with a rich embed built with Discord's EmbedBuilder.

## What it does

Sends a single embed that shows title, description, fields (inline and full-width), thumbnail (the bot's avatar), footer, and timestamp. No user input; the content is fixed. Use it as a reference for building embeds in your own commands.

## How it works

- **Data** — `SlashCommandBuilder` with name and description; no options.
- **Execute** — Builds an `EmbedBuilder`:
  - `setColor`, `setTitle`, `setDescription`
  - `addFields` with three fields (two inline, one not)
  - `setThumbnail(interaction.client.user.displayAvatarURL())`
  - `setFooter`, `setTimestamp`
  - Replies with `interaction.reply({ embeds: [embed] })`.

No modals, buttons, or select menus; the response is embed-only.

## See also

- [Commands overview](commands/overview.md)
- [Adding Commands](commands/adding-commands.md)
