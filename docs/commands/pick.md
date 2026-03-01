# /pick

String select menu (e.g. choose a fruit); replies ephemerally with the choice. Register `PICK_FRUIT` in `componentHandlers.ts`.

```typescript
import { type Interaction, SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';
import { buildStringSelect } from '../interactions/builders.js';

export const PICK_FRUIT = 'pick_fruit';

const PICK_OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
];

export async function handlePickFruit(i: Interaction): Promise<void> {
  if (!i.isStringSelectMenu()) return;
  const content = `You chose: **${i.values.join(', ')}**`;
  await i.reply({ content, flags: MessageFlags.Ephemeral });
}

export default {
  data: new SlashCommandBuilder().setName('pick').setDescription('Choose an option from a select menu'),
  async execute(interaction: ChatInputCommandInteraction) {
    const row = buildStringSelect(PICK_FRUIT, 'Choose a fruit', PICK_OPTIONS, 1, 1);
    await interaction.reply({
      content: 'Select a fruit from the menu:',
      components: [row],
    });
  },
} as DiscordCommand;
```

## See also

- [Overview](overview.md)
- [Building a command](../building-a-command.md)
- [Adding commands](adding-commands.md)
