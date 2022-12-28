const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Namn')
        .setDescription('Description'),
    async execute(interaction) {
        interaction.reply({
            content: "Vad den ska svara"
        })
    }
}