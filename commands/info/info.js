const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Information om olika delar av servern.')
        .addStringOption(option =>
            option
                .setName('vad')
                .setDescription('Vad vill du ha information om?')
                .setRequired(true)
                .addChoices(
                    {name: 'Servern', value: 'server'},
                    {name: 'Botten', value: 'bot'},
                    {name: 'SparaCash', value: 'sparacash'}
                )
            ),
        async execute(interaction) {

            let embed;

            switch(interaction.options.getString('vad')) {
                case 'server':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Server information')
                    .setDescription('Information om Discord servern.')
                    break;

                case 'bot':
                    embed = new EmbedBuilder()
                    .setTitle('Placeholder')
                    break;

                case 'sparacash':
                    embed = new EmbedBuilder()
                    .setTitle('Placeholder')
                    break;
            }

            interaction.reply({embeds: [embed]});

        }
}