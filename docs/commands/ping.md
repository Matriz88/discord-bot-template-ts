# /ping

Replies with "Pong!" and round-trip latency in ms.

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Reply with Pong!'),
  async execute(interaction: ChatInputCommandInteraction) {
    const latency = Date.now() - interaction.createdTimestamp;
    await interaction.reply({ content: `Pong! (${latency}ms)` });
  },
} as DiscordCommand;
```

## See also

- [Overview](overview.md)
- [Building a command](../building-a-command.md)
- [Adding commands](adding-commands.md)
