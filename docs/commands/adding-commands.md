# Adding commands

For a full step-by-step walkthrough (simple command, then command with a modal), see [Building a command](../building-a-command.md).

## Adding a command

1. Create a new file in `src/commands/` (e.g. `mycommand.ts`).
2. Export a default object that implements `DiscordCommand`: `data` (SlashCommandBuilder), `execute(interaction)`, and optionally `autocomplete(interaction)`.
3. The registerer picks it up on next start; `deployCommands()` registers it with Discord when the bot is ready.

Types: `DiscordCommand` in [`src/@types/discordbot.ts`](../src/@types/discordbot.ts). See [Architecture](../architecture.md).

**Minimal example** ([`src/commands/ping.ts`](../../src/commands/ping.ts)):

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

## Adding a command that uses components

1. Create the command file in `src/commands/`. Define customIds and export them. In `execute`, build the UI with builders from `src/interactions/builders.ts` (`buildModal`, `buildButtonRow`, `buildStringSelect`). Implement and export the submit/click/select handler (e.g. `getModalFieldValues` for modals). See [Reference](../reference.md) for signatures and types.
2. In `src/interactions/componentHandlers.ts`, import the handler and customId(s) and add entries to `COMPONENT_HANDLERS`.

**Command file example** (modal + handler in same file, [`src/commands/feedback.ts`](../../src/commands/feedback.ts)):

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
    content: `Thanks! **Subject:** ${values[FEEDBACK_SUBJECT]}\n**Message:** ${values[FEEDBACK_MESSAGE]}`,
    flags: MessageFlags.Ephemeral,
  });
}

export default {
  data: new SlashCommandBuilder().setName('feedback').setDescription('Open a form to submit feedback'),
  async execute(interaction: ChatInputCommandInteraction) {
    const modal = buildModal(FEEDBACK_MODAL, 'Send feedback', [
      { customId: FEEDBACK_SUBJECT, label: 'Subject', style: TextInputStyle.Short, required: true, maxLength: 100 },
      { customId: FEEDBACK_MESSAGE, label: 'Message', style: TextInputStyle.Paragraph, required: true, maxLength: 1000 },
    ]);
    await interaction.showModal(modal);
  },
} as DiscordCommand;
```

**Register in `componentHandlers.ts`**:

```typescript
import { FEEDBACK_MODAL, handleFeedbackModal } from '../commands/feedback.js';

export const COMPONENT_HANDLERS: Record<string, (i: Interaction) => Promise<void>> = {
  [FEEDBACK_MODAL]: handleFeedbackModal,
  // ... other entries
};
```
