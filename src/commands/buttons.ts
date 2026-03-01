import { type Interaction, SlashCommandBuilder, ChatInputCommandInteraction, ButtonStyle, MessageFlags } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';
import { buildButtonRow } from '../interactions/builders.js';

export const DEMO_BTN_PRIMARY = 'demo_btn_primary';
export const DEMO_BTN_SECONDARY = 'demo_btn_secondary';

const DEMO_BUTTON_MESSAGES: Record<string, string> = {
  [DEMO_BTN_PRIMARY]: 'You clicked the primary button!',
  [DEMO_BTN_SECONDARY]: 'You clicked the secondary button!',
};

export async function handleDemoButtons(i: Interaction): Promise<void> {
  if (!i.isRepliable()) return;
  const customId = 'customId' in i ? i.customId : '';
  const content = DEMO_BUTTON_MESSAGES[customId];
  if (content) await i.reply({ content, flags: MessageFlags.Ephemeral });
}

export default {
  data: new SlashCommandBuilder().setName('buttons').setDescription('Show a message with clickable buttons'),
  async execute(interaction: ChatInputCommandInteraction) {
    const row = buildButtonRow([
      {
        customId: DEMO_BTN_PRIMARY,
        label: 'Primary',
        style: ButtonStyle.Primary,
      },
      {
        customId: DEMO_BTN_SECONDARY,
        label: 'Secondary',
        style: ButtonStyle.Secondary,
      },
      {
        label: 'Discord.js Guide',
        style: ButtonStyle.Link,
        url: 'https://discordjs.guide/',
      },
    ]);
    await interaction.reply({
      content: 'Click a button below:',
      components: [row],
    });
  },
} as DiscordCommand;
