const Discord = require("discord.js");
require('dotenv').config();
const { Client, Events} = require('discord.js');
const { 
	alertEmbed, 
	checkIssueRow,
	setUserNickname,
	setGeneralRole,
	setCharacterRole
} = require("./Settings");

const client = new Client({ 
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
	Discord.GatewayIntentBits.MessageContent
  ] 
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on(Events.MessageCreate,  async message => {
	if (message.author.bot) return;
//Consts
	// Message Row 
	const messageRows = message.content.split('\n');
	// Role consts
	const hasGeneralRole = message.member.roles.cache.some(r => r.id === process.env.ROLE_GENERAL);
//
	const errors = [];
	messageRows.forEach((row, index) =>{
		errors.push(...(checkIssueRow(row, index)));
	})
	if(errors.length > 0){
		const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
		await channel.send({embeds:[alertEmbed.setColor('Red').setDescription(errors.join("\n"))]});
	}else{
		if(!hasGeneralRole){
			//set General Role
			setGeneralRole(message)
			// set character role
			setCharacterRole(message, messageRows);
			//set Nickname
			setUserNickname(message, messageRows);
		}else{
			const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
			await channel.send({embeds:[alertEmbed.setColor('Red').setDescription("Вы уже авторизированы")]});
		}
		console.log(errors); 
	}
});

client.once('ready', () => {
	console.log("Discord bot online")  
});
client.login(process.env.TOKEN);

// // copy message 
// 	const channel_Archive = client.channels.cache.get(process.env.ARCHIVE_SEND);
// await channel_Archive.send(message.content);
