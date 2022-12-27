const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder } = require('@discordjs/builders');
const { ModalBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('förslag')
        .setDescription('Lägg ett förslag till Discord servern.'),
        async execute(interaction) {
            const modal = new ModalBuilder()
                .setCustomId('suggestionModal')
                .setTitle('Nytt förslag')

            const suggestionInput = new TextInputBuilder()
                .setCustomId('suggestionInput')
                .setLabel('Förslag')
                .setPlaceholder('Jag tycker att..')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)

            const inputComponent = new ActionRowBuilder().addComponents(suggestionInput);

            modal.addComponents(inputComponent);

            interaction.showModal(modal);

        }
}