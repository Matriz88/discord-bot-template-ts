# Adding events

How to add a new Discord event handler to the template.

## Steps

1. **Create a new file** in `src/events/` (e.g. `guildMemberAdd.ts`).
2. **Export a default object** that implements `DiscordEvent`:
   - **`name`** — The Discord.js event name (e.g. `Events.GuildMemberAdd`).
   - **`once`** — Set to `true` if the handler should run only once (e.g. `ready`).
   - **`execute`** — Async function that handles the event. The registerer passes the normal event arguments plus **`token`** and **`clientId`** as the last two parameters (so you can use them for API calls or deploy logic if needed).
3. The registerer will pick up the file on the next start and attach the handler to the client. No manual registration.

## Execute signature

For a generic event `K`, `execute` receives:

- The same arguments Discord.js passes for that event (e.g. for `InteractionCreate`: `interaction`; for `ClientReady`: `client`).
- Then `token: string` and `clientId: string` appended by the template.

Example: the **ready** event runs once and its `execute(client, token, clientId)` calls `deployCommands(token, clientId, client)`.

## References

- **Type**: `DiscordEvent` is defined in [Architecture](architecture.md#key-types) and in `src/@types/discordbot.ts`.
- **Examples**: `src/events/ready.ts` (once, deploys commands) and `src/events/interactionCreate.ts` (every interaction, routes to commands and component handlers).
