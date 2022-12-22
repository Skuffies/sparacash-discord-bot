const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commandName')
        .setDescription('Beskrivningen på kommandot.'),
        async execute(interaction) {

        }
}