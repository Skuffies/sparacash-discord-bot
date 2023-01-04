const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
 
const axios = require('axios');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('index')
        .setDescription('Hitta information om ett index.')
        .addStringOption(option =>
            option
            .setName('namn')
            .setDescription('Namnet på indexet du vill hitta information om.')
            .setRequired(true)
            ),
        async execute(interaction) {

            const index = interaction.options.getString('namn');
            let indexNumber = 0;

            axios.get(`https://www.avanza.se/_mobile/market/search?query=${index}`).then(res => {

                while (res['data']['hits'][indexNumber]['instrumentType'] !== 'INDEX') {
                    indexNumber++;
                }

                let indexName = res['data']['hits'][indexNumber]['topHits'][0]['name'].toString();
                let indexPrice = res['data']['hits'][indexNumber]['topHits'][0]['lastPrice'].toString();
                let indexCurrency = res['data']['hits'][indexNumber]['topHits'][0]['currency'].toString();
                let indexPercent = res['data']['hits'][indexNumber]['topHits'][0]['changePercent'].toString();
                let indexCountry = res['data']['hits'][indexNumber]['topHits'][0]['flagCode'].toString();
                let indexId = res['data']['hits'][indexNumber]['topHits'][0]['id'].toString();

                if (!indexPercent.includes('-')) {
                    indexPercent = `+${indexPercent}`
                }

                const infoEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle('index information')
                .setTitle('index information')
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
                .addFields(
                    {name: 'Namn', value: indexName},
                    {name: 'Procentuell förändring', value: `${indexPercent}%`},
                    {name: 'Pris', value: `${indexPrice} ${indexCurrency}`},
                    {name: 'Landskod', value: indexCountry},
                    {name: 'Länk', value: `[${indexName} på Avanza](https://click.adrecord.com/?c=24113&p=836&epi=discord&url=https://www.avanza.se/indexr/om-indexn.html/${indexId}/${indexName.replaceAll(' ', '-')})`},
                )

                interaction.reply({
                    embeds: [infoEmbed]
                });

            }).catch(error => {
                interaction.reply({
                    content: 'Kunde inte hitta indexet.'
                });
            });
    }
}
