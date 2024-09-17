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
    
    if (interaction.user.id !== interaction.guild?.ownerId) {
      await interaction.followUp({
        ephemeral: true,
        content: 'Only the server owner can use this command.',
      });
      return;
    }

    if (interaction.channel.name !== process.env?.VOUCH_CHANNEL_NAME ?? 'vouches') {
      await interaction.followUp({
        ephemeral: true,
        content: 'You can only use this command in #vouches channel',
      });
      return;
    }

    // Delete old vouches
    const fetchedMessages = await interaction.channel.messages.fetch({ limit: 100 }); // Fetch recent 100 messages
    for (const [, message] of fetchedMessages) {
      if (message.embeds?.length > 0 && message.embeds[0]?.fields[0]?.name === 'Vouch Submitted!') {
        await message.delete(); 
        console.log(`Deleted vouch message: ${message.id}`);
      }
    }

    const vouches = getVouches(); 

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
  },
};
