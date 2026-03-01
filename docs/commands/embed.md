# /embed

Replies with a rich embed (EmbedBuilder: title, description, fields, thumbnail, footer, timestamp).

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';

export default {
  data: new SlashCommandBuilder().setName('embed').setDescription('Reply with a rich embed showcasing EmbedBuilder'),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle('Rich embed example')
      .setDescription('This message uses **EmbedBuilder** with title, description, fields, and footer.')
      .addFields(
        { name: 'Field 1', value: 'Content for the first field', inline: true },
        { name: 'Field 2', value: 'Content for the second field', inline: true },
        { name: 'Field 3', value: 'A longer field that is not inline.', inline: false },
      )
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: 'Example embed from discord.js' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
} as DiscordCommand;
```

## See also

- [Overview](overview.md)
- [Adding commands](adding-commands.md)
