# Discord Bot Template (TypeScript)

A template to build a Discord bot with Node.js, TypeScript, and [discord.js](https://discord.js.org/) v14. Includes slash commands and event handlers, auto-loaded from `src/commands/` and `src/events/`.

Example commands demonstrate **embeds**, **modals (forms)**, **buttons**, **select menus**, and **autocomplete**: `/embed`, `/feedback`, `/buttons`, `/pick`, `/choose`, plus `/ping` and `/echo`.

**Full documentation:** [GitHub Pages](https://matriz88.github.io/discord-bot-template-ts/) · [docs/](docs/) (open [docs/index.html](docs/index.html) locally). Getting started, configuration, architecture, best practices, commands.

<br/>

## Run locally

**Development** (with tsx, no build step):

```shell
npm run dev
```

**Production**:

```shell
npm run build
npm start
```

For production on another machine: run `npm run build`, then run `node dist/index.js` (or use your own process manager or container).

<br/>

## Invite link

Replace `YOUR_CLIENT_ID` with your application's client ID from the [Discord Developer Portal](https://discord.com/developers/applications):

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147494912&scope=bot%20applications.commands
```

<br/>

## Bump version

```shell
npm run bump-version -- [major|minor|patch]
```
