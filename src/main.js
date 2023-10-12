const Discord = require("discord.js");
require('dotenv').config();
const { Client, Events, ActivityType} = require('discord.js');
const { 
	WarningEmbed, 
	ErrorEmbed
} = require("./bot_consts");
const {
	checkIssueRow, 
    checkBannedWords,
    setUserNickname,
    setGeneralRole,
    setCharacterRole, 
    checkMessage, 
	sendErrorEmbed
} = require('./bot_logic')

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
	const hasGeneralRole = message.member.roles.cache.has(process.env.ROLE_GENERAL);
	// channel const
	const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
	// error const
	const errors = [];
    const Errors = [];
//
	if (checkMessage(messageRows)) {
		messageRows.forEach((row, index) =>{
			errors.push(...(checkIssueRow(row, index,)));
		})
		if(errors.length){
			sendErrorEmbed(message, errors, channel, ErrorEmbed)
		}else{
			messageRows.forEach((row, index)=>{
				Errors.push(...(checkBannedWords(row, index)));
			})
			if(Errors.length > 0){
				sendErrorEmbed(message, Errors, channel, ErrorEmbed)
			}else{
				setTimeout(() =>{
					if(hasGeneralRole === false){
						//set General Role
						setGeneralRole(message, messageRows)
					
						//set character role
						setCharacterRole(message, messageRows);
						
						//set Nickname
						setUserNickname(message, messageRows);
			
						//Send complete message authorize
						channel.send({embeds:[WarningEmbed.setColor('Green').setDescription("Авторизация пройдена успешно" + `<@${message.author.id}>`)]});

						//Check General role 
						// If Gen role == role.Blade send message to archive else send message to archive and tag admins
					}else{
						channel.send({embeds:[WarningEmbed.setColor('Red').setDescription("Вы уже авторизированы")]});
					}
				}, 500)	
			}
		}
	}else {
    	channel.send({embeds:[WarningEmbed.setColor('Red').setDescription("Анкета не соостветвует примеру!")]});
	}
	
});


client.once('ready', () => {
	console.log("Discord bot online")  
	client.user.setActivity({
		name: 'Elder Bugs Online',
		type: ActivityType.Playing
	})
});
client.login(process.env.TOKEN);

// // copy message 
// 	const channel_Archive = client.channels.cache.get(process.env.ARCHIVE_SEND);
// await channel_Archive.send(message.content);
