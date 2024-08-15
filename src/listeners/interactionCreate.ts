import { CommandInteraction, Client, Interaction, Collection } from 'discord.js';
import { Commands } from '../Commands';
import { Command } from '../Command'

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      try {
        await handleSlashCommand(client, interaction);
      } catch (error) {
        console.log('could not handle slash command', error);
      }
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction,
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occurred' });
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction);
};
