import { Events } from 'discord.js';
import { deployCommands } from '../deploy-commands.js';
import { CustomClient, DiscordEvent } from '../@types/discordbot.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: CustomClient, token: string, clientId: string) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    console.log();

    await deployCommands(token, clientId, client);
  },
} as DiscordEvent;
