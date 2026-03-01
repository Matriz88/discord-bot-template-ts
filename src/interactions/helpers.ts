import { Interaction, MessageFlags } from 'discord.js';

/**
 * Sends an error message to the user: edits the reply if the interaction was already deferred, otherwise replies ephemerally.
 * Used by the interaction event handler for command and component errors.
 */
export async function replyOrEditError(interaction: Interaction, errMessage: string): Promise<void> {
  if (!interaction.isRepliable()) return;
  if (interaction.deferred) {
    await interaction.editReply({ content: errMessage });
  } else {
    await interaction.reply({
      content: errMessage,
      flags: MessageFlags.Ephemeral as typeof MessageFlags.Ephemeral,
    });
  }
}
