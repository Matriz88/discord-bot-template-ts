import { Collection, Client, SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, ClientEvents } from 'discord.js';

/**
 * Discord client extended with a commands collection.
 * Commands are loaded from `src/commands/` via `registerCommands`.
 */
export type CustomClient = Client & {
  commands: Collection<string, DiscordCommand>;
};

/**
 * Slash command definition. Export a default object with `data` and `execute`.
 * Optionally add `autocomplete` for commands with autocomplete options.
 */
export type DiscordCommand = {
  /** Slash command metadata and options (name, description, options). */
  data: SlashCommandBuilder;
  /** Runs when the user invokes the slash command. */
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
  /** Optional. Runs when the user focuses an autocomplete option. */
  autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
};

/**
 * Event handler definition. Export a default object with `name` and `execute`.
 * Event handlers receive the event args plus `token` and `clientId` as the last two arguments.
 */
export type DiscordEvent<K extends keyof ClientEvents = keyof ClientEvents> = {
  /** Event name (e.g. `Events.InteractionCreate`). */
  name: K;
  /** If true, the handler runs only once. */
  once?: boolean;
  /** Handler; args are the event payload plus (token, clientId). */
  execute: (...args: [...ClientEvents[K], string, string]) => Promise<void>;
};

export type CommandPutResponse = {
  id: string;
  application_id: string;
  version: string;
  default_member_permissions: string | null;
  type: number;
  name: string;
  name_localizations: Record<string, string> | null;
  description: string;
  description_localizations: Record<string, string> | null;
  dm_permission: boolean;
  contexts: number[] | null;
  integration_types: number[];
  options: CommandOption[];
  nsfw: boolean;
};

type CommandOption = {
  type: number;
  name: string;
  name_localizations: Record<string, string> | null;
  description: string;
  description_localizations: Record<string, string> | null;
  required: boolean;
};
