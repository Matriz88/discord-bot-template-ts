import { Client, GatewayIntentBits } from 'discord.js';
import { CustomClient } from './@types/discordbot.js';
import { getEnv } from './utils/config.js';
import { registerCommands, registerEvents } from './utils/registerers.js';

const token = getEnv('DISCORD_TOKEN');
const clientId = getEnv('DISCORD_CLIENTID');

console.log(`Starting bot clientId: ${clientId}\n`);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
}) as CustomClient;

await registerCommands(client);
await registerEvents(client, token, clientId);
await client.login(token);
