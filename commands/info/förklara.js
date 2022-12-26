const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('förklara')
        .setDescription('Förklaringar om olika begrepp.')
        .addStringOption(option =>
            option
                .setName('begrepp')
                .setDescription('Begreppet du vill ha förklarat.')
                .setRequired(true)
                .addChoices(
                    {name: 'A & B aktier.', value: 'ab'},
                    {name: 'Aktier som minderårig', value: 'minderårig'},
                    {name: 'K4-Blanketten', value: 'k4'},
                    {name: 'Skatt mellan ISK/KF', value: 'isk/kf'},
                    {name: 'Ränta på ränta', value: 'rpr'},
                )
            ),
        async execute(interaction) {
            
            let embed;

            switch(interaction.options.getString('begrepp')) {
                case 'ab':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('A & B aktier.')
                    .setDescription('Den stora skillnaden mellan A och B-aktier är att en A-aktie är 10 gånger mer värd än en B-aktie sett till rösträtt. För dig som är småsparare gör det ingen större skillnad och därför rekommenderar jag att du köper B-aktien eller den aktie som är billigast mellan de två.\n\nA aktier har högt rösträtt, B aktier har 1/10 av A aktierna men dem är den mest omsatta. C aktier däremot har 1/100 dels av en A aktie. \nLäs mer här: [Länk](https://sparacash.se/a-och-b-aktier/)')
                    break;

                case 'minderårig':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Aktier som minderårig')
                    .setDescription('**Hur köper man aktier och fonder som minderårig?** **Svar:** Man skapa ett konto med sina vårdnadshavare, dem måste vara fullmakt. Man kan alltså inte köpa aktier med sin egna inloggning utan bara kolla hur det går. På Avanza kan man köpa fonder som minderårig men inte på Nordnet. \n\n**Hur skapar man ett konto för minderåriga?** **Svar:** Här kan man skapa ett konto för minderåriga på Nordnet https://aslinkhub.com/?bid=2128994&media_id=45739&sub=discord och Avanza https://click.adrecord.com?c=24113&p=836&epi=discord. \n\n**Hur mycket måste man investera med?** **Svar:** Många tror att man måste ha ett visst belopp för att börja investera men så är inte fallet. Många föräldrar som själva investerar tror att alla betalar 39 kr courtage oavsett belopp. Men i själva verket så betalar man minder courtage desto minder pengar man har och dem första 6 månaderna på Nordnet är courtage fritt och dem första 12 på Avanza. Efter att ens fria courtage har gått ut så betalar man olika mycket beroende på hur mycket pengar man har. På avanza handlar man alla fonder gratis under 50 000 kr. Ifall man är med i UA (unga aktiesparare) får man 60% billigare courtage på Nordnet. \n\n**Kan man ha aktier som minderårig?** **Svar:** Ja det kan man, man kan inte köpa aktier som minderårig men ens föräldrar kan köpa åt dig.')
                    break;

                case 'k4':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('K4-Blanketten')
                    .setDescription('Du behöver bara fylla i din k4-blankett om du sålt aktier eller certifikat på ett AF-konto. Då fyller du i omkostnadsbeloppet. (Totala köpbeloppet inklusive courtage). Fonder behöver du ej fylla i. Det sker automatiskt. Handel på ISK/KF behöver inte heller tas upp på k4. \nLäs mer här: [Länk](https://sparacash.se/k4-blankett/)')
                    break;

                case 'isk/kf':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Skatt mellan ISK/KF')
                    .setDescription('När du gör insättningar på isk och kf så höjer du skatteunderlaget. Men när du tar ut pengar så tas detta inte hänsyn till förutom vid den kvartalvisa kontrollen för ditt värde.');
                    break;

                case 'rpr':
                    embed = new EmbedBuilder()
                    .setColor('#2fd8eb')
                    .setTitle('Ränta på ränta')
                    .setDescription('Det enklaste sättet att förklara detta är med ett exempel. Låt oss säga att du har 100 kr på ditt investeringskonto och att dina pengar ökar med 10% (avkastning/ränta). \nI slutet av året skulle du ha tjänat 10 kr i ränta (eller kapitalet ökat med 10% - dvs 10 kr avkastning). \nÅr 2 så är ditt konto nu värt 110 kr. Så om du får samma ränta eller avkastning på 10% så kommer dina pengar nu istället öka med 11 kr i värde (10% avkastning på 110 kr blir 11 kr) i slutet av år två. \nDina pengar är nu alltså värda 121 kr.\nhttps://sparacash.se/rantekalkylatorn/');
                    break;
            }

            interaction.reply({embeds: [embed]});

        }
}