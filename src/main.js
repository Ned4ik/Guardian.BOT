const Discord = require("discord.js");
require('dotenv').config();
const { Client, Events, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { 
	alertEmbed, 
	autorizeEmbed, 
	checkZeroRow, 
	checkPrefix, 
	checkMessageRow,
	messageRowsRegMap,
	checkIssueRow
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
		const hasRoleTank = message.member.roles.cache.some(r => r.id === process.env.ROLE_TANK);
        const hasRoleHealer = message.member.roles.cache.some(r => r.id === process.env.ROLE_HEALER);
        const hasRoleDamager = message.member.roles.cache.some(r => r.id === process.env.ROLE_DAMAGER);
	//

	const errors = [];
	messageRows.forEach((row, index) =>{
		errors.push(...(checkIssueRow(row, index)));
	})

	if(errors.length){
		const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
		await channel.send({embeds:[alertEmbed.setColor('Red').setDescription(errors.join("\n"))]});
	}
	console.log(errors.join("\n")); 

});

client.once('ready', () => {
	console.log("Discord bot online")  
});
client.login(process.env.TOKEN);



//set role Blade
//arg//
// let role = message.guild.roles.cache.find(r => r.id === process.env.ROLE_GENERAL);
// message.member.roles.add(role);

// //set nickname
// const nickname = zeroRow[2] + ' ' + '(' + zeroRow[4] + ')';
// message.member.setNickname(nickname);

// // send message alert about complete autorize
// await message.author.send('Авторизация пройдена успешно!');

// 	const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
// 	await channel.send({embeds:[alertEmbed.setColor('Green').setDescription('Авторизация пройдена успешно!')]});

// // copy message 
// 	const channel_Archive = client.channels.cache.get(process.env.ARCHIVE_SEND);
// await channel_Archive.send(message.content);
