import {
    CommandInteraction,
    Client,
    ApplicationCommandOptionType,
    TextChannel,
    TextBasedChannel,
  } from 'discord.js';
  import { Command } from '../Command';
import wipe from '../functions/wipe';

export const Wipe: Command = {
    name: 'wipe',
    description: 'Delete <number> of messages from the channel',
    options: [
      {
        name: 'nbr',
        description: 'Number of message to delete',
        type: ApplicationCommandOptionType.Number,
        required: true,
        min_value: 1,
        max_value: 50000,
      },
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        if (!interaction.isChatInputCommand() || !(interaction.channel instanceof TextChannel)) return;
    
        const nbr = interaction.options.getNumber('nbr') ?? 0;
        const isMoreThan100 = nbr > 100

        if(isMoreThan100) {
            let removed = 0;
            for (let index = 1; index < nbr / 100; index++) {
                const awaiting = nbr - removed;

                if(awaiting <= 0) break;

                await wipe(interaction.channel, awaiting > 100 ? 100 : awaiting)
                removed += awaiting > 100 ? 100 : awaiting
            }
        } else {
            wipe(interaction.channel, nbr)
        }
    },
  };
  