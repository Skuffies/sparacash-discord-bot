const fs = require('fs');

const { Collection } = require('discord.js');

const commands = [];

function register(client) {

    client.commands = new Collection();

    const commandFolders = fs.readdirSync('./commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }
    }
}

module.exports = {
    register: register,
    commands: commands
}