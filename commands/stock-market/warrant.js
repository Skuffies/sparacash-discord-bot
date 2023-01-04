const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warrant')
        .setDescription('Hitta information om en warrant.')
        .addStringOption(option =>
            option
            .setName('namn')
            .setDescription('Namnet på warranten du vill hitta information om.')
            .setRequired(true)
            ),
        async execute(interaction) {

            const warrant = interaction.options.getString('namn');
            let indexNumber = 0;

            axios.get(`https://www.avanza.se/_mobile/market/search?query=${warrant}`).then(res => {

                while (res['data']['hits'][indexNumber]['instrumentType'] !== 'WARRANT') {
                    indexNumber++;
                }

                let warrantName = res['data']['hits'][indexNumber]['topHits'][0]['name'].toString();
                let warrantPrice = res['data']['hits'][indexNumber]['topHits'][0]['lastPrice'].toString();
                let warrantCurrency = res['data']['hits'][indexNumber]['topHits'][0]['currency'].toString();
                let warrantPercent = res['data']['hits'][indexNumber]['topHits'][0]['changePercent'].toString();
                let warrantCountry = res['data']['hits'][indexNumber]['topHits'][0]['flagCode'].toString();
                let warrantId = res['data']['hits'][indexNumber]['topHits'][0]['id'].toString();

                if (!warrantPercent.includes('-')) {
                    warrantPercent = `+${warrantPercent}`
                }

                const infoEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle('Warrant information')
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
                .addFields(
                    {name: 'Namn', value: warrantName},
                    {name: 'Procentuell förändring', value: `${warrantPercent}%`},
                    {name: 'Pris', value: `${warrantPrice} ${warrantCurrency}`},
                    {name: 'Landskod', value: warrantCountry},
                    {name: 'Länk', value: `[${warrantName} på Avanza](https://click.adrecord.com/?c=24113&p=836&epi=discord&url=https://www.avanza.se/borshandlade-produkter/warranter-torg/om-warranten.html/${warrantId}/${warrantName.replaceAll(' ', '-')})`},
                )

                interaction.reply({
                    embeds: [infoEmbed]
                });

            }).catch(error => {
                interaction.reply({
                    content: 'Kunde inte hitta warranten.'
                });
            });
    }
}