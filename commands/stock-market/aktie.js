const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ALLOWED_STICKER_EXTENSIONS } = require('discord.js');

const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aktie')
        .setDescription('Hitta information om en aktie.')
        .addStringOption(option =>
            option
            .setName('namn')
            .setDescription('Namnet på aktien du vill hitta information om.')
            .setRequired(true)
            ),
        async execute(interaction) {
            const stock = interaction.options.getString('namn');

            axios.get(`https://www.avanza.se/_mobile/market/search?query=${stock}`).then(res => {

                let stockName = res['data']['hits'][0]['topHits'][0]['name'].toString();
                let stockPrice = res['data']['hits'][0]['topHits'][0]['lastPrice'].toString();
                let stockCurrency = res['data']['hits'][0]['topHits'][0]['currency'].toString();
                let stockPercent = res['data']['hits'][0]['topHits'][0]['changePercent'].toString();
                let stockCountry = res['data']['hits'][0]['topHits'][0]['flagCode'].toString();
                let stockId = res['data']['hits'][0]['topHits'][0]['id'].toString();

                if (!stockPercent.includes('-')) {
                    stockPercent = `+${stockPercent}`
                }

                const infoEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle('Aktie information')
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
                .addFields(
                    {name: 'Namn', value: stockName},
                    {name: 'Procentuell förändring', value: `${stockPercent}%`},
                    {name: 'Pris', value: `${stockPrice} ${stockCurrency}`},
                    {name: 'Landskod', value: stockCountry},
                    {name: 'Länk', value: `[${stockName} på Avanza](https://click.adrecord.com/?c=24113&p=836&epi=discord&url=https://www.avanza.se/aktier/om-aktien.html/${stockId}/${stockName.replace(' ', '-')})`},
                )

                interaction.reply({
                    embeds: [infoEmbed]
                });

            }).catch(error => {

                interaction.reply({
                    content: 'Kunde inte hitta aktien.'
                });

            });
    }
}