import { Client } from 'discord.js';
import { Commands } from '../Commands';

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }

    // make sure all guild are cached
    await client.guilds.fetch();

    await client.application.commands.set(Commands);

    client.user.setActivity('Watching ur ass');
    console.log(`${client.user.username} is online and ready !`);
  });
};
