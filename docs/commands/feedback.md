# /feedback

Opens a modal (subject + message); on submit, replies with a thank-you (ephemeral). Register `FEEDBACK_MODAL` in `componentHandlers.ts`.

```typescript
import { type Interaction, SlashCommandBuilder, ChatInputCommandInteraction, TextInputStyle, MessageFlags } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';
import { buildModal, getModalFieldValues } from '../interactions/builders.js';

export const FEEDBACK_MODAL = 'feedback_modal';
export const FEEDBACK_SUBJECT = 'feedback_subject';
export const FEEDBACK_MESSAGE = 'feedback_message';

export async function handleFeedbackModal(i: Interaction): Promise<void> {
  if (!i.isModalSubmit()) return;
  const values = getModalFieldValues(i, [FEEDBACK_SUBJECT, FEEDBACK_MESSAGE]);
  await i.reply({
    content: `Thanks for your feedback!\n**Subject:** ${values[FEEDBACK_SUBJECT]}\n**Message:** ${values[FEEDBACK_MESSAGE]}`,
    flags: MessageFlags.Ephemeral,
  });
}

export default {
  data: new SlashCommandBuilder().setName('feedback').setDescription('Open a form to submit feedback (modal example)'),
  async execute(interaction: ChatInputCommandInteraction) {
    const modal = buildModal(FEEDBACK_MODAL, 'Send feedback', [
      {
        customId: FEEDBACK_SUBJECT,
        label: 'Subject',
        style: TextInputStyle.Short,
        placeholder: 'Brief subject line',
        required: true,
        maxLength: 100,
      },
      {
        customId: FEEDBACK_MESSAGE,
        label: 'Message',
        style: TextInputStyle.Paragraph,
        placeholder: 'Your feedback here...',
        required: true,
        maxLength: 1000,
      },
    ]);
    await interaction.showModal(modal);
  },
} as DiscordCommand;
```

In `componentHandlers.ts`: `[FEEDBACK_MODAL]: handleFeedbackModal`.

## See also

- [Overview](overview.md)
- [Adding commands](adding-commands.md)
