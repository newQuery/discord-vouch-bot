import { CommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
  name: string;
  run: (client: Client, interaction: CommandInteraction) => void;
  cooldown?: number;
}
