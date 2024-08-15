import {
  CommandInteraction,
  Client,
  EmbedBuilder,
  TextChannel,
} from 'discord.js';
import { Command } from '../Command';
import getVouches from '../database/getVouches';

export const Restore: Command = {
  name: 'restore',
  description: 'Restore previous vouches',
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

    const vouches = await getVouches(); 

    if (!vouches || vouches.length === 0) {
      await interaction.followUp({ content: 'No vouches found.', ephemeral: true });
      return;
    }

    for (const vouch of vouches) {
      const { message, rating, user_id } = vouch as any;

      // Fetch the user by ID
      const user = await client.users.fetch(user_id);

      if (!user) {
        console.error(`User with ID ${user_id} not found.`);
        continue; // Skip this vouch if the user is not found
      }

      const embed = new EmbedBuilder()
        .setColor(user.hexAccentColor ?? '#0099ff')
        .setThumbnail(user.displayAvatarURL({ forceStatic: false }))
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
          value: `${user.tag}`, // Use user.tag to get the username#discriminator
        })
        .setTimestamp(new Date())
        .setFooter({ text: '🚀 Only use if you have purchased.' });

      await interaction.channel.send({ embeds: [embed] });
    }

    await interaction.followUp({ content: `Restored ${vouches.length} vouches.`, ephemeral: true });
  },
};
