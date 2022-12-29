const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guider')
        .setDescription('SparaCashs guider.')
        .addStringOption(option =>
            option
                .setName('guide')
                .setDescription('Guiden du vill ha länken till.')
                .setRequired(true)
                .addChoices(
                    {name: 'Courtage', value: 'courtage'},
                    {name: 'Binance', value: 'binance'},
                    {name: 'Portfölj', value: 'portfölj'},
                )
            ),
        async execute(interaction) {
            
            let text;

            switch(interaction.options.getString('guide')) {
                case 'courtage':
                    text = 'https://sparacash.se/courtage';
                    break;

                case 'binance':
                    text = 'https://sparacash.se/ta-ut-pengar-fran-binance/';
                    break;

                case 'portfölj':
                    text = 'https://sparacash.se/mina-investeringar';
                    break;
            }

            interaction.reply({
                content: text
            });

        }
}