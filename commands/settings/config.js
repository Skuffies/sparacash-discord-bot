const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

const fs = require('fs');
const file = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Konfigurera olika delar av SparaCash botten.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addSubcommand(subCommand =>
            subCommand
            .setName('lönekampen')
            .setDescription('Ändra länken för lönekampen.')
            .addStringOption(option =>
                option
                .setName('länk')
                .setDescription('Länken till lönekampen.')
                .setRequired(true)
                )),
        async execute(interaction) {

            let link;

            switch(interaction.options.getSubcommand()) {
                case 'lönekampen':
                    link = interaction.options.getString('länk');

                    file['lönekampen']['link'] = link;
        
                    fs.writeFileSync('config.json', JSON.stringify(file, null, 2), (error) => {
                        console.error(error);
                    })
        
                    interaction.reply({content: 'Uppdaterade konfigurationen för lönekampen.'});
                    break;
            }
        }
}