const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const os = require('os');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('index')
        .setDescription('Information om olika index.')
        .addStringOption(option =>
            option
            .setName('namn')
            .setDescription('Namnet på indexet.')
            .addChoices(
                {name: 'Nasdaq', value: 'nasdaq'},
                {name: 'Omxs30', value: 'omxs30'},
                {name: 'Omxspi', value: 'omxspi'},
            )
            .setRequired(true)
            ),
        async execute(interaction) {

            await interaction.deferReply();

            let url;
            let browser;

            switch (interaction.options.getString('namn')) {
                case 'nasdaq':
                    url = 'https://www.avanza.se/index/om-indexet.html/19006/nasdaq';
                    break;

                case 'omxs30':
                    url = 'https://www.avanza.se/index/om-indexet.html/19002/omx-stockholm-30'; 
                    break;

                case 'omxspi':
                    url = 'https://www.avanza.se/index/om-indexet.html/18988/omx-stockholm-pi';
                    break;
            }
    
            if (os.arch() === 'arm') {
                browser = await puppeteer.launch({
                    defaultViewport: {
                        height: 1080,
                        width: 1920,
                    },
                    executablePath: '/usr/bin/chromium-browser',
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            } else {
                browser = await puppeteer.launch({
                    defaultViewport: {
                        height: 1080,
                        width: 1920,
                    },
            });
            }
            
            const page = await browser.newPage();
    
            await page.goto(url);
    
            await page.waitForNavigation({waitUntil: 'networkidle0'});
    
            let graph = await page.screenshot({clip: {x: 374, y: 268, width: 770, height: 393}});
            let price = await page.screenshot({clip: {x: 1160, y: 268, width: 385, height: 193}});
    
            await browser.close();
    
            const priceAttachment = new AttachmentBuilder(price, {name: 'price.png'});
            const graphAttachment = new AttachmentBuilder(graph, {name: 'screenshot.png'});
    
            let priceEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle(`Pris: ${interaction.options.getString('namn').toUpperCase()}`)
                .setDescription(`Den senaste dagens pris av ${interaction.options.getString('namn').toUpperCase()}`)
                .setImage(`attachment://${priceAttachment.name}`)
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
    
            let graphEmbed = new EmbedBuilder()
                .setColor('#2fd8eb')
                .setTitle(`Diagram: ${interaction.options.getString('namn').toUpperCase()}`)
                .setDescription(`Den senaste dagens diagram av ${interaction.options.getString('namn').toUpperCase()}`)
                .setImage(`attachment://${graphAttachment.name}`)
                .setFooter({
                    text: '*Upp till 15 min fördröjning*'
                })
    
            interaction.editReply({embeds: [priceEmbed, graphEmbed], files: [graphAttachment, priceAttachment]});

        }
}