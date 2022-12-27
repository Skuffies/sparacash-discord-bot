const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")

module.exports ={
    data: new SlashCommandBuilder()
        .setName('kontakt')
		.setDescription('Hur du kan kontakta SparaCash.'),
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setColor('#2fd8eb')
        .setTitle('Kontakt')
        .setDescription('Här kan du kontakta oss på SparaCash\nhttps://sparacash.se/kontakta-oss/')

        interaction.reply({embeds: [embed]});
    }
}