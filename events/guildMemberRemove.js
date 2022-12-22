module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        try {
            let memberChannel = member.guild.channels.cache.find(channel => channel.id === "1050127173702397972");
            memberChannel.setName(`Medlemmar: ${memberCount.toLocaleString()}`);
        } catch (err) {
            console.error(err);
        }
    }
}