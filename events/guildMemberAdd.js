const { COUNT_CHANNEL, JOIN_CHANNEL } = process.env;

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {

        let memberCount = member.guild.memberCount;

        try {
            let memberChannel = member.guild.channels.cache.find(channel => channel.id === COUNT_CHANNEL);
            memberChannel.setName(`Medlemmar: ${memberCount.toLocaleString()}`);
        } catch (err) {
            console.error(err);
        }

        let welcomeChannel = member.guild.channels.cache.find(channel => channel.id === JOIN_CHANNEL);
	    welcomeChannel.send(`<@${member.id}> Välkommen till SparaCashs Discord Server! För att se resten av kanalerna måste du verifiera dig.`);

    }
}