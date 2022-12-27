const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lönekampen')
        .setDescription('Den nuvarande länken för lönekampen.'),
        async execute(interaction) {
            
            const configFile = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

            let link = configFile['lönekampen']['link'];

            const embed = new EmbedBuilder()
            .setColor('#2fd8eb')
		    .setTitle('Lönekampen')
            .setDescription(`Länk: ${link}\nSlutdatum: 24/${new Date().getMonth() + 1}`)

            interaction.reply({
                embeds: [embed]
            });
        }
}