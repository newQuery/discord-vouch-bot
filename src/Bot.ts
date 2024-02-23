require('dotenv').config();
import { Client, ClientOptions, Collection, IntentsBitField } from 'discord.js';
import ready from './listeners/ready';
import interactionCreate from './listeners/interactionCreate';

const token = process.env.TOKEN;

console.log('Bot is starting...');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
});

ready(client);

interactionCreate(client);

client.login(token);
