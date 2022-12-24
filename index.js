const os = require('os');
if (os.arch() === 'arm') {
    require('dotenv').config({ path: '../.env' });
} else {
    require('dotenv').config();
}

const { TOKEN } = process.env;
const { Client } = require('discord.js');

const client = new Client({
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ]
});

require('./functions/registerCommands.js').register(client);
require('./functions/registerEvents.js').register(client);

client.login(TOKEN);