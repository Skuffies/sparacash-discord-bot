module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
    
            await interaction.reply({
                content: 'Ett problem uppstod när kommandot utfördes!',
                ephemeral: true
            });
        }
    }
}