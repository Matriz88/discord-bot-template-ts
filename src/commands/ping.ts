import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Reply with Pong!'),
  async execute(interaction: ChatInputCommandInteraction) {
    const latency = Date.now() - interaction.createdTimestamp;
    await interaction.reply({ content: `Pong! (${latency}ms)` });
  },
} as DiscordCommand;
