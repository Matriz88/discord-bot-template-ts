# Adding events

1. Create a new file in `src/events/` (e.g. `guildMemberAdd.ts`).
2. Export a default object that implements `DiscordEvent`: `name` (e.g. `Events.GuildMemberAdd`), `once` (true for one-off like `ready`), `execute`.
3. The registerer picks it up on next start and attaches the handler. No manual registration.

**`execute`** receives the normal event arguments plus `token` and `clientId` (appended by the registerer). Example: `execute(client, token, clientId)` for the ready event.

**Example** ([`src/events/ready.ts`](../src/events/ready.ts)):

```typescript
import { Events } from 'discord.js';
import { deployCommands } from '../deploy-commands.js';
import { CustomClient, DiscordEvent } from '../@types/discordbot.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: CustomClient, token: string, clientId: string) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    await deployCommands(token, clientId, client);
  },
} as DiscordEvent;
```

Type: `DiscordEvent` in [`src/@types/discordbot.ts`](../src/@types/discordbot.ts). See [Architecture](architecture.md#key-types). Examples: `ready.ts`, `interactionCreate.ts`.
