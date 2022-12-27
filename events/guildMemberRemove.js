const { COUNT_CHANNEL } = process.env;

module.exports = {
    name: "guildMemberRemove",
    async execute(member) {

        let memberCount = member.guild.memberCount;

        try {
            let memberChannel = member.guild.channels.cache.find(channel => channel.id === COUNT_CHANNEL);
            memberChannel.setName(`Medlemmar: ${memberCount.toLocaleString()}`);
        } catch (err) {
            console.error(err);
        }
    }
}