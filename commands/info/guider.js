const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guider')
        .setDescription('SparaCashs guider.')
        .addStringOption(option =>
            option
                .setName('guide')
                .setDescription('Guiden du vill ha länken till.')
                .setRequired(true)
                .addChoices(
                    {name: 'Courtage', value: 'courtage'},
                    {name: 'Binance', value: 'binance'},
                    {name: 'Portfölj', value: 'portfölj' },
                    {name: 'Nackdelar med KF', value: 'kf' },
                    {name: 'Räkna ut ISK skatt', value: 'iskskatt'},
                    {name: 'Bästa sparandet', value: 'bästa-sparandet'},
                    {name: 'Livestream', value: 'livestream'},
                    {name: 'Investera som minderårig', value: 'minderårig'},
                    { name: 'Remember Flex - omdömme', value: 'remember-flex' },
                    { name: 'Bästa fonderna', value: 'bästa-fonderna' },
                    { name: 'Stop loss', value: 'stop-loss' },
                    { name: 'Aktiekampen', value: 'aktiekampen' },
                    { name: 'Bästa aktierna för nybörjare', value: 'bästa-aktierna' },
                    { name: 'Investera 10 000kr', value: 'investera10000' },
                    { name: 'Binance Card', value: 'binance-card' },
                    
                )
            ),
        async execute(interaction) {
            
            let text;

            switch(interaction.options.getString('guide')) {
                case 'courtage':
                    text = 'https://sparacash.se/courtage';
                    break;

                case 'binance':
                    text = 'https://sparacash.se/ta-ut-pengar-fran-binance/';
                    break;

                case 'portfölj':
                    text = 'https://sparacash.se/mina-investeringar';
                    break;
                
                case 'kf':
                    text = 'https://sparacash.se/kapitalforsakring-nackdelar/';
                    break;
                
                case 'iskskatt':
                    text = 'https://sparacash.se/isk-skatt/';
                    break;
                
                case 'bästa-sparandet':
                    text = 'https://sparacash.se/basta-sparandet/';
                    break;
                
                case 'livestream':
                    text = 'https://sparacash.se/livestream-om-aktier-fonder/';
                    break;
                
                case 'minderårig':
                    text = 'https://sparacash.se/under-18/';
                    break;
                
                case 'remember-flex':
                    text = 'https://sparacash.se/remember-flex/';
                    break;
                
                case 'bästa-fonderna':
                    text = 'https://sparacash.se/basta-fonderna/';
                    break;
                
                case 'stop-loss':
                    text = 'https://sparacash.se/stop-loss/';
                    break;
                
                case 'aktiekampen':
                    text = 'https://sparacash.se/aktiekampen/';
                    break;
                
                case 'bästa-aktierna':
                    text = 'https://sparacash.se/basta-aktierna-for-nyborjare/';
                    break;
                
                case 'investera10000':
                    text = 'https://sparacash.se/investera-10-000-kr/';
                    break;
                
                case 'binance-card':
                    text = 'https://sparacash.se/binance-card/';
                    break;

                
                
            }

            interaction.reply({
                content: text
            });

        }
}