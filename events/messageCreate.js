module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.author.bot) return

        if (message.content.toLowerCase().includes('botjävel')) {
			message.reply('Så får man inte säga, jag gör mitt bästa!')
		}
    }
}