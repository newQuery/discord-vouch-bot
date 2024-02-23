import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextChannel,
} from 'discord.js';
import { Command } from '../Command';

export const Vouch: Command = {
  name: 'vouch',
  description: 'Give a vouch with a message and rating (1-5)',
  options: [
    {
      name: 'message',
      description: 'Message for the vouch',
      type: ApplicationCommandOptionType.String,
      required: true,
      min_length: 5,
    },
    {
      name: 'rating',
      description: 'Rating 1 - 5',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
      max_value: 5,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand() || !(interaction.channel instanceof TextChannel)) return;

    if (interaction.channel.name !== process.env?.VOUCH_CHANNEL_NAME ?? 'vouches') {
      // uncomment if you want to let the user know why the command failed
      // await interaction.followUp({
      //   ephemeral: true,
      //   content: 'You can only use this command in #vouches channel',
      // });
      return;
    }

    const message = interaction.options.getString('message');
    const rating = interaction.options.getNumber('rating');

    const embed = new EmbedBuilder()
      .setColor(interaction.user.hexAccentColor ?? '#0099ff')
      .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: false }))
      .addFields({
        name: 'Vouch Submitted!',
        value: '⭐'.repeat(rating ?? 0),
      })
      .addFields({
        name: 'Message',
        value: message ?? 'No message provided',
      })
      .addFields({
        name: 'Vouch by:',
        value: `${interaction.user}`,
      })
      .setTimestamp(new Date())
      .setFooter({ text: '🚀 Only use if you have purchased.' });

    interaction.followUp({ embeds: [embed] });
  },
};
