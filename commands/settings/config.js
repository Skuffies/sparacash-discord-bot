const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

const file = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Konfigurera olika delar av SparaCash botten.')
        .addSubcommand(subCommand =>
            subCommand
            .setName('aktiekampen')
            .setDescription('Ändra länken och datumet för aktiekampen.')
            .addStringOption(option =>
                option
                .setName('länk')
                .setDescription('Länken till aktiekampen.')
                .setRequired(true)
                )
            .addStringOption(option =>
                option
                .setName('datum')
                .setDescription('Datumet när aktiekampen slutar.')
                .setRequired(true)
                )
            ),
        async execute(interaction) {

            const link = interaction.options.getString('link');
            const date = interaction.options.getString('date');

            file['aktiekampen']['link'] = link;
            file['aktiekampen']['date'] = date;

            fs.writeFileSync('config.json', JSON.stringify(file, null, 2), (error) => {
                console.error(error);
            })

            interaction.reply({content: 'Uppdaterade konfigurationen'})

        }
}