# /buttons

Sends a message with clickable buttons: Primary, Secondary, and a Link button to the Discord.js guide.

## What it does

The bot replies with a short line of text and a row of three buttons. Clicking the Primary or Secondary button triggers a handler that replies (ephemerally) with a different message. The third button is a link: it opens a URL and does not send an interaction to the bot. Demonstrates `buildButtonRow` and button click handlers.

## How it works

- **Data** — `SlashCommandBuilder` for `/buttons`; no options.
- **Execute** — Builds one action row with `buildButtonRow([...])`: two buttons with customIds (`DEMO_BTN_PRIMARY`, `DEMO_BTN_SECONDARY`) and styles Primary/Secondary, and one Link button with `url: 'https://discordjs.guide/'` (no customId). Replies with `content` and `components: [row]`.
- **Handler** — `handleDemoButtons` is registered in `componentHandlers.ts` for both `DEMO_BTN_PRIMARY` and `DEMO_BTN_SECONDARY`. It reads `interaction.customId`, looks up the message in a small map, and replies ephemerally. Link buttons do not fire interactions; they only open the URL.

The handler and customIds are exported from the command file; `componentHandlers.ts` imports them and adds both customIds to the same handler.

## See also

- [Commands overview](overview.md)
- [Adding Commands](adding-commands.md) (including "Adding a command that uses components")
- [Architecture](../architecture.md) (component flow)
