const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Radera upp till 100 meddelanden.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addIntegerOption(option =>
            option
            .setName('amount')
            .setDescription('The amount of messages to delete.')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
            ),
        async execute(interaction) {
            let deleteAmount = interaction.options.getInteger('amount');
            interaction.channel.bulkDelete(deleteAmount, true).then(messages => {
                interaction.reply({
                    content: `Raderade ${messages.size} meddelanden.`,
                    ephemeral: true
                });
            });
        }
}