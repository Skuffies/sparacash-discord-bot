module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.author.bot) return

        if (message.content.toLowerCase().includes('botjävel')) {
            message.reply('Så får man inte säga, jag gör mitt bästa!')
        } else if (message.content.toLowerCase().includes(`<@${message.client.user.id}`)) {
            message.reply('Skriv i kanalen respektiv för ditt ämne för att få svar på dina frågor.')
        }
    }
}