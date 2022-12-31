const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('etf')
        .setDescription('Hitta information om en ETF.')
        .addStringOption(option =>
            option
            .setName('namn')
            .setDescription('Namnet på ETFn du vill hitta information om.')
            .setRequired(true)
            ),
        async execute(interaction) {
            const etf = interaction.options.getString('namn');

            axios.get(`https://www.avanza.se/_mobile/market/search?query=${etf}`).then(res => {

                let exchange_traded_fundName = res['data']['hits'][0]['topHits'][0]['name'].toString();
                let exchange_traded_fundPrice = res['data']['hits'][0]['topHits'][0]['lastPrice'].toString();
                let exchange_traded_fundCurrency = res['data']['hits'][0]['topHits'][0]['currency'].toString();
                let exchange_traded_fundPercent = res['data']['hits'][0]['topHits'][0]['changePercent'].toString();
                let exchange_traded_fundCountry = res['data']['hits'][0]['topHits'][0]['flagCode'].toString();
                let exchange_traded_fundId = res['data']['hits'][0]['topHits'][0]['id'].toString();

                if (!exchange_traded_fundPercent.includes('-')) {
                    exchange_traded_fundPercent = `+${exchange_traded_fundPercent}`
                }

                const infoEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle('ETF information')
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
                .addFields(
                    {name: 'Namn', value: exchange_traded_fundName},
                    {name: 'Procentuell förändring', value: `${exchange_traded_fundPercent}%`},
                    {name: 'Pris', value: `${exchange_traded_fundPrice} ${exchange_traded_fundCurrency}`},
                    {name: 'Landskod', value: exchange_traded_fundCountry},
                    {name: 'Länk', value: `[${exchange_traded_fundName} på Avanza](https://click.adrecord.com/?c=24113&p=836&epi=discord&url=https://www.avanza.se/aktier/om-aktien.html/${exchange_traded_fundId}/${exchange_traded_fundName.replaceAll(' ', '-')})`},
                )

                interaction.reply({
                    embeds: [infoEmbed]
                });

            }).catch(error => {
                interaction.reply({
                    content: 'Kunde inte hitta ETFn'
                });

            });
    }
}