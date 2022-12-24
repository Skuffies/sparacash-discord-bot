const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const os = require('os');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('omxs30')
        .setDescription('Pris och graf på OMXS30.'),
    async execute(interaction) {

        await interaction.deferReply();

        let browser;

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

        await page.goto('https://www.avanza.se/index/om-indexet.html/19002/omx-stockholm-30');

        await page.waitForNavigation({waitUntil: 'networkidle0'});

        let graph = await page.screenshot({clip: {x: 374, y: 268, width: 770, height: 393}});
        let price = await page.screenshot({clip: {x: 1160, y: 268, width: 385, height: 193}});

        await browser.close();

        const priceAttachment = new AttachmentBuilder(price, {name: 'price.png'});
        const graphAttachment = new AttachmentBuilder(graph, {name: 'screenshot.png'});

        let priceEmbed = new EmbedBuilder()
            .setColor('#2fd8eb')
            .setTitle('Pris: OMXS30')
            .setDescription('Den senaste dagens pris av OMXS30.')
            .setImage(`attachment://${priceAttachment.name}`)
            .setFooter({
                text: '*Upp till 15 min fördröjning*'
            })

        let graphEmbed = new EmbedBuilder()
            .setColor('#2fd8eb')
            .setTitle('Diagram: OMXS30')
            .setDescription('Den senaste dagens diagram av OMXS30.')
            .setImage(`attachment://${graphAttachment.name}`)
            .setFooter({
                text: '*Upp till 15 min fördröjning*'
            })

        interaction.editReply({embeds: [priceEmbed, graphEmbed], files: [graphAttachment, priceAttachment]});

    }
};