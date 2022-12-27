const { EmbedBuilder } = require('discord.js');
const { LOGGING_CHANNEL } = process.env;

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'suggestionModal') {
                
                const embed = new EmbedBuilder()
                    .setTitle('Nytt förslag')
                    .addFields([
                        {name: 'Användare', value: `<@${interaction.member.id}>`},
                        {name: 'Förslag', value: interaction.fields.getTextInputValue('suggestionInput')}
                    ])

                interaction.guild.channels.cache.find(channel => channel.id === LOGGING_CHANNEL).send({embeds: [embed]});    

                await interaction.reply({
                    content: 'Ditt förslag skickades!',
                    ephemeral: true
                });
            }
        }

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
    
            await interaction.reply({
                content: 'Ett problem uppstod när kommandot utfördes!',
                ephemeral: true
            });
        }
    }
}