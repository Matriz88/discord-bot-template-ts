import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { REST, Routes } from 'discord.js';
import { getEnv } from './utils/config.js';

const guildID = 'XXXXXXXXXXXXX';

const token = getEnv('DISCORD_TOKEN');
const clientId = getEnv('DISCORD_CLIENTID');

const commandsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'commands');
const commandFiles = fs.readdirSync(commandsDir).filter((f) => f.endsWith('.js') || f.endsWith('.ts'));
const commands: object[] = [];

for (const file of commandFiles) {
  const mod = await import(pathToFileURL(path.join(commandsDir, file)).href);
  const command = mod.default ?? mod;
  if (command?.data) commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildID), {
      body: [],
    });
    await rest.put(Routes.applicationCommands(clientId), { body: [] });

    console.log(`Successfully deleted ${commands.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
