# /choose

String option with autocomplete; suggests matching items as the user types, then replies with the chosen value.

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';

const ITEM_OPTIONS = [
  { name: 'Sword', value: 'sword' },
  { name: 'Shield', value: 'shield' },
  { name: 'Potion', value: 'potion' },
  { name: 'Key', value: 'key' },
  { name: 'Map', value: 'map' },
];

export default {
  data: new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Pick an item (autocomplete example)')
    .addStringOption((option) => option.setName('item').setDescription('The item to choose').setRequired(true).setAutocomplete(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const value = interaction.options.getString('item', true);
    await interaction.reply({ content: `You chose: **${value}**` });
  },
  async autocomplete(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused().toLowerCase();
    const filtered = ITEM_OPTIONS.filter((opt) => opt.name.toLowerCase().includes(focused)).slice(0, 25);
    await interaction.respond(filtered.map((opt) => ({ name: opt.name, value: opt.value })));
  },
} as DiscordCommand;
```

## See also

- [Overview](overview.md)
- [Building a command](../building-a-command.md)
- [Adding commands](adding-commands.md)
