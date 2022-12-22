const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")

module.exports ={
    data: new SlashCommandBuilder()
        .setName('affiliate')
		.setDescription('SparaCashs affiliate länkar.'),
    async execute(interaction){;
		const affiliateEmbed = new EmbedBuilder()
		.setColor('#2fd8eb')
		.setTitle('Affiliate länkar')
		.setDescription('Affiliate länkar du kan använda för att få gratis\n förmåner medans du samtidigt stöttar\nMarcus och SparaCash.')
		.addFields(
		{ name: 'Avanza (Köp aktier & fonder upp till 50 000 kr utan avgifter)', value: '[Länk](https://click.adrecord.com?c=24113&p=836&epi=discord)', inline: true},
		{ name: 'Nordnet (Köp aktier upp till 80 000 kr utan avgifter)', value: '[Länk](https://aslinkhub.com/?bid=2128994&media_id=45739&sub=discord)', inline: true},
		{ name: 'SAVR', value: '[Länk](https://track.adtraction.com/t/t?a=1315701143&as=1165593249&t=2&tk=1&epi=discord)', inline: true},
		{ name: 'LYSA (20% rabatt med länken)', value: '[Länk](https://lysa.se/sparacash)', inline: true},
		{ name: 'eToro', value: '[Länk](https://med.etoro.com/B15351_A87328_TClick_Sdiscord.aspx)', inline: true},
		{ name: 'SaveLend (Få upp till 600 kr bonus vid investering) ', value: '[Länk](https://invest.savelend.se/refer-a-friend/?id=58256645-06bd-ffe4-a303-6477af884003)', inline: true},
		{ name: 'Avanza Sparkonto+', value: '[Länk](https://click.adrecord.com/?c=24113&p=836&epi=discord&url=https%3A//www.avanza.se/sparkonto.html)', inline: true},
		{ name: 'Rocker Bankkort (få 500 kr)', value: '[Länk](https://track.adtraction.com/t/t?a=1697258929&as=1165593249&t=2&tk=1&epi=discord)', inline: true},
		{ name: 'TradingView - 30 dagar FREE TRIAL (Bäst för Teknisk Analys)', value: '[Länk](https://www.tradingview.com/?offer_id=10&aff_id=26280)', inline: true},
		{ name: 'Binance: Köp kryptovalutor till LÄGST AVGIFTER', value: '[Länk](https://accounts.binance.me/en/register?ref=18075503)', inline: true},
			)

		interaction.channel.send({ embeds: [affiliateEmbed] });
    }
}