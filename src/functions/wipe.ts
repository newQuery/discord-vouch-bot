import { TextBasedChannel } from "discord.js";

const wipe = async (channel: TextBasedChannel, nbr: number)  => {
    const fetchedMessages = await channel.messages.fetch({ limit: nbr });
    for (const [, message] of fetchedMessages) {
        await message.delete();
    }
    console.log(`Wipe finish. Deleted ${nbr} messages`)
}

export default wipe;