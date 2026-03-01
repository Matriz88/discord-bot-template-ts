# /echo

Echoes back the user's message (truncated to 2000 chars). Required string option.

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';

const MAX_LENGTH = 2000;

export default {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echo back a message')
    .addStringOption((option) => option.setName('message').setDescription('The message to echo').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const text = interaction.options.getString('message') ?? '';
    const safe = text.slice(0, MAX_LENGTH);
    await interaction.reply({ content: safe || '(empty)' });
  },
} as DiscordCommand;
```

## See also

- [Overview](overview.md)
- [Building a command](../building-a-command.md)
- [Adding commands](adding-commands.md)
