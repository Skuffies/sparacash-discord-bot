const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nasdaq')
        .setDescription('Pris och graf på NASDAQ.'),
    async execute(interaction) {

        await interaction.deferReply();

        let browser;

        try {
            // Windows 10
            browser = await puppeteer.launch({
                defaultViewport: {
                    height: 1080,
                    width: 1920,
                }
            });
        }catch(err) {
            // Linux/ARM
            browser = await puppeteer.launch({
                defaultViewport: {
                    height: 1080,
                    width: 1920,
                    executablePath: '/usr/bin/chromium-browser',
                }
            });
        }

        const page = await browser.newPage();

        await page.goto('https://www.avanza.se/index/om-indexet.html/19006/nasdaq');

        await page.waitForNavigation({waitUntil: 'networkidle0'});

        let graph = await page.screenshot({clip: {x: 374, y: 268, width: 770, height: 393}});
        let price = await page.screenshot({clip: {x: 1160, y: 268, width: 385, height: 193}});

        await browser.close();

        const priceAttachment = new AttachmentBuilder(price, {name: 'price.png'});
        const graphAttachment = new AttachmentBuilder(graph, {name: 'screenshot.png'});

        let priceEmbed = new EmbedBuilder()
            .setColor('#2fd8eb')
            .setTitle('Pris: NASDAQ')
            .setDescription('Den senaste dagens pris av NASDAQ.\n*(Upp till 15 min fördröjning)*')
            .setImage(`attachment://${priceAttachment.name}`)
            .setFooter({
                text: '*Upp till 15 min fördröjning*'
            })

        let graphEmbed = new EmbedBuilder()
            .setColor('#2fd8eb')
            .setTitle('Diagram: NASDAQ')
            .setDescription('Den senaste dagens diagram av NASDAQ.\n*(Upp till 15 min fördröjning)*')
            .setImage(`attachment://${graphAttachment.name}`)
            .setFooter({
                text: '*Upp till 15 min fördröjning*'
            })

        interaction.editReply({embeds: [priceEmbed, graphEmbed], files: [graphAttachment, priceAttachment]});

    }
};