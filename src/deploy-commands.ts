import { REST, Routes } from 'discord.js';
import { CustomClient, CommandPutResponse } from './@types/discordbot.js';

export async function deployCommands(token: string, clientId: string, client: CustomClient): Promise<void> {
  const commands = Array.from(client.commands.values()).map((c) => c.data.toJSON());
  const rest = new REST().setToken(token);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = (await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    })) as CommandPutResponse[];
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
