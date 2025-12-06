const { EmbedBuilder } = require('discord.js');
const { BOT_OWNER_ID } = require('../config/constants');

// Store ping status for bot owner (default is enabled)
let botOwnerPingEnabled = true;

async function handlePingToggle(message) {
  const userId = message.author.id;
  
  // Only bot owner can use this command
  if (userId !== BOT_OWNER_ID) {
    await message.reply('❌ This command is only available for the bot owner.');
    return;
  }
  
  // Toggle the status
  botOwnerPingEnabled = !botOwnerPingEnabled;
  
  const embed = new EmbedBuilder()
    .setTitle('🔔 Ping Notifications')
    .setDescription(`Ping notifications are now **${botOwnerPingEnabled ? 'ENABLED ✅' : 'DISABLED ❌'}**`)
    .setColor(botOwnerPingEnabled ? 0x27ae60 : 0xe74c3c)
    .setFooter({ text: `Use @${message.client.user.username} ping to toggle again` });
  
  await message.reply({ embeds: [embed] });
}

function isPingEnabled() {
  return botOwnerPingEnabled;
}

module.exports = {
  handlePingToggle,
  isPingEnabled
};
