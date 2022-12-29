const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fond')
        .setDescription('Hitta information om en fond.')
        .addStringOption(option =>
            option
            .setName('namn')
            .setDescription('Namnet på fonden du vill hitta information om.')
            .setRequired(true)
            ),
        async execute(interaction) {

            const fund = interaction.options.getString('namn');
            let indexNumber = 0;

            axios.get(`https://www.avanza.se/_mobile/market/search?query=${fund}`).then(res => {

                while (res['data']['hits'][indexNumber]['instrumentType'] !== 'FUND') {
                    indexNumber++;
                }

                let fundName = res['data']['hits'][indexNumber]['topHits'][0]['name'].toString();;
                let fundPercent1Day = res['data']['hits'][indexNumber]['topHits'][0]['changeSinceOneDay'].toString();
                let fundPercent3Months = res['data']['hits'][indexNumber]['topHits'][0]['changeSinceThreeMonths'].toString();
                let fundPercent1Year = res['data']['hits'][indexNumber]['topHits'][0]['changeSinceOneYear'].toString();
                let fundRiskLevel = res['data']['hits'][indexNumber]['topHits'][0]['riskLevel'].toString();
                let fundRisk = res['data']['hits'][indexNumber]['topHits'][0]['risk'].toString();
                let fundId = res['data']['hits'][indexNumber]['topHits'][0]['id'].toString();

                if (!fundPercent1Day.includes('-')) {
                    fundPercent1Day = `+${fundPercent1Day}`
                } else if (!fundPercent3Months.includes('-')) {
                    fundPercent3Months = `+${fundPercent3Months}`
                } else if (!fundPercent1Year.includes('-')) {
                    fundPercent1Year = `+${fundPercent1Year}`
                }

                const infoEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle('Fond information')
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
                .addFields(
                    {name: 'Namn', value: fundName},
                    {name: 'Procentuell förändring', value: '\u200b'},
                    {name: '\u200b\n1 Dag', value: `${fundPercent1Day}%`, inline: true},
                    {name: '\u200b\n3 Mån', value: `${fundPercent3Months}%`, inline: true},
                    {name: '\u200b\n1 År', value: `${fundPercent1Year}%`, inline: true},
                    {name: 'Risk', value: `${fundRiskLevel.slice(0, 1)}${fundRiskLevel.slice(1).toLowerCase()} ${fundRisk}`},
                    {name: 'Länk', value: `[${fundName} på Avanza](https://click.adrecord.com/?c=24113&p=836&epi=discord&url=https://www.avanza.se/fonder/om-fonden.html/${fundId}/${fundName.replaceAll(' ', '-')})`},
                )

                interaction.reply({
                    embeds: [infoEmbed]
                });

            }).catch(error => {
                interaction.reply({
                    content: 'Kunde inte hitta fonden.'
                });

            });
    }
}