const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aktiekampen')
        .setDescription('Den nuvarande länken för aktiekampen.'),
        async execute(interaction) {
            
            const configFile = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

            let link = configFile['aktiekampen']['link'];

            const embed = new EmbedBuilder()
            .setColor('#2fd8eb')
		    .setTitle('Aktiekampen')
            .setDescription(`Länk: ${link}`)

            interaction.reply({
                embeds: [embed]
            });
        }
}