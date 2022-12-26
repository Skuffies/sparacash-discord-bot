module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.author.bot) return

        switch (message.content.toLowerCase().includes()) {

            case 'botjävel':
                message.reply('Så får man inte säga, jag gör mitt bästa!')
                break;

            case 'grabify':
                message.delete();
                break;
        }
    }
}