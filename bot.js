const { Client, GatewayIntentBits } = require('discord.js');

// Initialize the client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Configuration - Update these values!
const TRIGGER_WORD = 'pluh'; // Change to the word you want to listen for
const FORWARD_CHANNEL_ID = '1560496677608095868'; // Change to your destination channel ID
const FORWARD_MESSAGE = 'https://klipy.com/gifs/pluh-cat-2'; // Change to your custom message

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    // Prevent the bot from responding to itself or other bots
    if (message.author.bot) return;

    // Check if the message contains the trigger word (case-insensitive)
    if (message.content.toLowerCase().includes(TRIGGER_WORD.toLowerCase())) {
        try {
            // Fetch the channel where you want to forward the message
            const targetChannel = await client.channels.fetch(FORWARD_CHANNEL_ID);
            
            if (targetChannel && targetChannel.isTextBased()) {
                // Send the new custom message to that channel
                await targetChannel.send(FORWARD_MESSAGE);
            }
        } catch (error) {
            console.error('Failed to forward message:', error);
        }
    }
});

// Paste your bot token from the developer portal here
client.login('process.env.DISCORD_TOKEN');
