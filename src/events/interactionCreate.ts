/** Routes to commands, autocomplete, and component handlers. See src/interactions/ for handler definitions. */
import { Events, Interaction } from 'discord.js';
import { CustomClient, DiscordEvent } from '../@types/discordbot.js';
import { replyOrEditError } from '../interactions/helpers.js';
import { COMPONENT_HANDLERS } from '../interactions/componentHandlers.js';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction, _token: string, _clientId: string) {
    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
      const client = interaction.client as CustomClient;
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        if (interaction.isChatInputCommand()) {
          await command.execute(interaction);
        } else if (command.autocomplete) {
          await command.autocomplete(interaction);
        }
      } catch (error) {
        console.error(error);
        if (interaction.isChatInputCommand()) {
          await replyOrEditError(interaction, '😥 There was an error while executing this command!');
        }
      }
      return;
    }

    if (interaction.isModalSubmit() || interaction.isButton() || interaction.isStringSelectMenu()) {
      const handler = COMPONENT_HANDLERS[interaction.customId];
      try {
        if (handler) await handler(interaction);
      } catch (error) {
        console.error(error);
        await replyOrEditError(interaction, '😥 There was an error handling the interaction!');
      }
    }
  },
} as DiscordEvent;
