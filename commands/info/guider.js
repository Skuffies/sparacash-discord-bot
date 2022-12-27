const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

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
            
            let embed;

            switch(interaction.options.getString('guide')) {
                case 'courtage':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Courtage')
                    .setDescription('https://sparacash.se/courtage')
                    break;

                case 'binance':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Binance')
                    .setDescription('https://sparacash.se/ta-ut-pengar-fran-binance/')
                    break;

                case 'portfölj':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Portfölj')
                    .setDescription('https://sparacash.se/mina-investeringar')
                    break;
            }

            interaction.reply({embeds: [embed]});

        }
}