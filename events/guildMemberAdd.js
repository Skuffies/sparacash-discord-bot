module.exports = {
    name: "guildMemberAdd",
    async execute(member) {

        console.log('Joinade')

        try {
            let memberChannel = member.guild.channels.cache.find(channel => channel.id === "1050127173702397972");
            memberChannel.setName(`Medlemmar: ${memberCount.toLocaleString()}`);
        } catch (err) {
            console.error(err);
        }

        let welcomeChannel = member.guild.channels.cache.find(channel => channel.id === "1050492603545690202");
	    welcomeChannel.send(`<@${member.id}> Välkommen till SparaCashs Discord Server! För att se resten av kanalerna måste du verifiera dig.`);

    }
}