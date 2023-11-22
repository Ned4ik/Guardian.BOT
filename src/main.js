const Discord = require("discord.js");
require('dotenv').config();
const { Client, Events, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const {
	WarningEmbed,
	ErrorEmbed, 
	AcceptEmbed, 
	helperRoleCommand
} = require("./bot_consts");
const {
	checkIssueRow,
	checkBannedWords,
	setUserNickname,
	setGeneralRole,
	setCharacterRole,
	checkMessage,
	sendErrorEmbed,
	sendMessageToArchive,
	giveAssistantRole,
	deleteWelcomeMessage,
	sendWelcomeMessage,
	reactOnJoinMessage,
} = require('./bot_logic')

const {
	regExpIndexBody
} = require('./regular_expression')
const client = new Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMessageReactions
	]
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;
	//Consts
	// Message Row 
	const messageRows = message.content.split('\n');
	const userMessageWithPrefix = messageRows[0].split(' ');
	// Role consts
	const hasGeneralRole = message.member.roles.cache.has(process.env.ROLE_GENERAL);
	const helperRole = message.guild.roles.cache.find( r => r.id === process.env.ROLE_ASSISTANT);
	// channel const
	const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
	const channel_Archive = client.channels.cache.get(process.env.ARCHIVE_SEND);
	// error const
	const errorsStructure = [];
	const errorsBannedWord = [];
	//

	// Authorise 
	if (regExpIndexBody.test(messageRows[0]) && message.channelId === process.env.AUTHCOMMAND_CHANNEL) {
		if (checkMessage(messageRows)) {
			messageRows.forEach((row, index) => {
				errorsStructure.push(...(checkIssueRow(row, index,)));
			})
			messageRows.forEach((row, index) => {
				errorsBannedWord.push(...(checkBannedWords(row, index)));
			})
			if (errorsStructure.length > 0 || errorsBannedWord.length > 0 || errorsStructure.length && errorsBannedWord > 0) {
				sendErrorEmbed(errorsStructure, errorsBannedWord, message, ErrorEmbed)
				return;
			}
			setTimeout(() => {
				if (hasGeneralRole === false) {
					setTimeout(() => {
						//set General Role
						setGeneralRole(message, messageRows)
					}, 3000)

					setTimeout(() => {
						//set character role
						setCharacterRole(message, messageRows);
					}, 4000)
					setTimeout(() => {
						//set Nickname
						setUserNickname(message, messageRows);
					}, 5000)
					setTimeout(() => {
						//Send complete message authorize
						message.author.send({ embeds: [AcceptEmbed]});
					}, 6000)

					//Send Message to archive
					setTimeout(() => {
						sendMessageToArchive(channel_Archive, message);
						deleteWelcomeMessage(message);
					}, 7000)
					//Send welcome message
					setTimeout(() => {
						channel.send(`Добро Пожаловать <@${message.author.id}> в Стражи Безумия` + '');
						setTimeout(()=>{
							reactOnJoinMessage(channel, message);
						}, 2000)
						
					}, 8000)
				} else {
					message.delete();
					message.author.send({ embeds: [WarningEmbed]});
				}
			}, 500)


		} else {
			message.delete();
			message.author.send({ embeds: [ErrorEmbed.setDescription("* Анкета не соостветвует примеру.")] });
		}
	}
    
    // Give assistant role
	if (userMessageWithPrefix[0] === helperRoleCommand && message.channelId === process.env.COMMAND_CHANNEL ) {
		giveAssistantRole(userMessageWithPrefix, helperRole, message);
	}
});

// Send Welcome Message
client.on('guildMemberAdd', member =>{
	sendWelcomeMessage(member);
});

//Create Branch with Trial Anket 
// client.on('interactionCreate', async interaction =>{
// 	if (!interaction.isChatInputCommand()) return;

// 	if (interaction.commandName === 'hike') {
// 		const channel = client.channels.cache.get(process.env.ARCHIVE_SEND)
// 		const trialName = interaction.options.get('trial');
// 		const hike_day = interaction.options.get('day');
// 		const hike_time = interaction.options.get('time');
// 		const hike_month = interaction.options.get('month');
// 		const hike_day_digit = interaction.options.get('date');
// 		const hike_type = interaction.options.get('type');
// 		const raidLeaderRole = interaction.options.get('leader');

// 		const thread = await channel.threads.create({
// 			name: trialName.value,
// 			autoArchiveDuration: 60,
// 			reason: 'Need this thread'
// 		});

// 		trialAnketSend(trialName, hike_time, hike_month, hike_day_digit, hike_type, raidLeaderRole, thread, interaction, client);
// 		interaction.reply('Thread created ' + thread.name);
// 	}
    
// })

client.once('ready', () => {
	console.log("Discord bot online")
	client.user.setActivity({
		name: 'Elder Bugs Online',
		type: ActivityType.Playing
	})
});
client.login(process.env.TOKEN);