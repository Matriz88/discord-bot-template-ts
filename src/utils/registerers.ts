import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { CustomClient, DiscordCommand, DiscordEvent } from '../@types/discordbot.js';
import { Collection } from 'discord.js';

/** Loads command modules from the commands folder into client.commands. */
export const registerCommands = async (client: CustomClient) => {
  client.commands = new Collection();

  return registrationInternal<DiscordCommand>('../commands/', (command, absPath) => {
    if (command?.data?.name && typeof command?.execute === 'function') {
      console.log(`-- ${command.data.name}`);
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`[WARNING] ${absPath} missing "data" or "execute" export`);
    }
  });
};

/** Loads event modules and attaches them to the client. */
export const registerEvents = async (client: CustomClient, token: string, clientId: string) => {
  return registrationInternal<DiscordEvent>('../events/', (event) => {
    console.log(`-- ${event.name.toString()}`);
    if (event.once) {
      client.once(event.name.toString(), (...args: unknown[]) =>
        // DiscordEvent<K> execute signature includes (token, clientId); we inject them here, so the generic cannot be inferred and we cast.
        (event as unknown as { execute: (...a: unknown[]) => Promise<void> }).execute(...args, token, clientId),
      );
    } else {
      client.on(event.name.toString(), (...args: unknown[]) =>
        // DiscordEvent<K> execute signature includes (token, clientId); we inject them here, so the generic cannot be inferred and we cast.
        (event as unknown as { execute: (...a: unknown[]) => Promise<void> }).execute(...args, token, clientId),
      );
    }
  });
};

const registrationInternal = async <T>(folder: string, callbackFn: (fileOutput: T, absPath: string) => void) => {
  const folderPath = fileURLToPath(new URL(folder, import.meta.url));
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  console.log(`Registering ${folder}:`);
  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name);
    if (ext !== '.js' && ext !== '.ts') continue;

    const absPath = path.join(folderPath, entry.name);
    const url = pathToFileURL(absPath).href;

    try {
      const mod = await import(url);
      const fileOutput = mod.default ?? mod;

      callbackFn(fileOutput as T, absPath);
    } catch (err) {
      console.error(`[ERROR] Failed to load ${absPath}:`, err);
    }
  }

  console.log(`\n`);
};
