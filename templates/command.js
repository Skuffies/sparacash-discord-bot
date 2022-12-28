const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Namn')
        .setDescription('Kommandots beskrivning.'),
    async execute(interaction) {

        // Svar på kommandot | Ephemeral ifall det endast ska visas för användaren
        interaction.reply({
            content: "Vad den ska svara",
            ephemeral: false
        });
    }
}