const  { TOKEN, CLIENT_ID, GUILD_ID, STATUS } = process.env;

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client, commands) {
        console.log(`${client.user.username} är redo!`);

        const rest = new REST({
            version: "10",
        }).setToken(TOKEN);

        ( async () => {
            try {
                if (STATUS === 'PRODUCTION') {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands,
                    });
                    console.log(`Registrerade ${commands.length} kommandon globalt.`);
                } else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                        body: commands,
                    });
                    console.log(`Registrerade ${commands.length} kommandon lokalt.`);
                }
            } catch (error) {
                if (error) console.error(error);
            }
        })();
    }
}