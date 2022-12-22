const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('copycat')
        .setDescription('Kopierar ditt meddelande.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option =>
            option
            .setName('meddelande')
            .setDescription('meddelandet som ska kopieras.')
            .setRequired(true)
            .setMaxLength(2000)
        ),
    async execute(interaction){
		if(!interaction.member.roles.cache.has('1048938852947079218')) {
            return interaction.reply('Du har inte tillgång till det här kommandot.');
        };

        const copycatMessage = interaction.options.getString('meddelande');

        interaction.channel.send(copycatMessage);

        interaction.reply({
            content: 'Kopierade ditt meddelande.',
            ephemeral: true,
        });
    }
}