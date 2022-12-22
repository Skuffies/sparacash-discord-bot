const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ab')
        .setDescription('Förklarar vad skillnaden på A och B är.'),
    async execute(interaction) {

        const infoEmbed = new EmbedBuilder()
        .setColor('#2fd8eb')
        .setTitle('A & B Aktier')
        .setDescription('Den stora skillnaden mellan A och B-aktier är att en A-aktie är 10 gånger mer värd än en B-aktie sett till rösträtt. För dig som är småsparare gör det ingen större skillnad och därför rekommenderar jag att du köper B-aktien eller den aktie som är billigast mellan de två.\n\nA aktier har högt rösträtt, B aktier har 1/10 av A aktierna men dem är den mest omsatta. C aktier däremot har 1/100 dels av en A aktie. \nLäs mer här: [Länk](https://sparacash.se/a-och-b-aktier/)');

        interaction.reply({ embeds: [infoEmbed] })
    }
};