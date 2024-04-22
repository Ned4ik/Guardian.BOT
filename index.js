const Discord = require("discord.js");
require('dotenv').config();
const { Client, Events, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const {
	WarningEmbed,
	anketEmbed,
	AcceptEmbed,
	leftEmbed,
} = require("./src/bot_consts.js");

const {
	checkIssueRow,
	checkBannedWords,
	checkMessage,
	setGeneralRoleInteraction,
    setCharacterRoleInteraction,
    setUserNicknameInteraction,
	sendMessageToArchiveInteraction,
	reactOnJoinMessageInteraction,
	deleteWelcomeMessage,
} = require('./events/authorize.js')

const {
	trialAnketSend,
	reactTrialAnket,
	
} = require('./events/campaign.js')

const {
	sendWelcomeMessage,
	leftMemberMessage
} = require('./events/memberActivity.js')


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

// Improve Authorize Function
client.on('interactionCreate', async interaction => {
	await interaction.deferReply({ephemeral: true});

	const memberAnkett = [];

	// error const
	const errorsStructure = [];
	const errorsBannedWord = [];
	//

	// Role consts
	const hasGeneralRole = interaction.member.roles.cache.has(process.env.ROLE_GENERAL);
    //

	// channel const
	const channel = client.channels.cache.get(process.env.AUTORIZE_SEND);
	const channel_Archive = client.channels.cache.get(process.env.ARCHIVE_SEND);
	//

	if(interaction.commandName === 'authorize') {

		//Initialize command options
		const memberID = interaction.options.get('id');
		const memberName = interaction.options.get('name');
		const guildMember = interaction.options.get('member');
		const memberAge = interaction.options.get('age');
		const memberCP = interaction.options.get('cp');
		const memberCharacterRole = interaction.options.get('characters');
		const memberPurpose = interaction.options.get('purpose');
		//
		const options = [memberID,memberName,guildMember,memberAge,memberCP,memberPurpose,memberCharacterRole];
		const arrChecker = arr => arr.every(option => option !== null);

		
		if (interaction.channelId === process.env.AUTHCOMMAND_CHANNEL) {
			
			if (arrChecker(options) === true) {

				// Make member anket
				memberAnkett.push(`> 1. ${memberID.value} - (${memberName.value})`);
				memberAnkett.push(`> 3. ${guildMember.value}`);
				memberAnkett.push(`> 4. Возраст ${memberAge.value}`);
				memberAnkett.push(`> 5. ${memberCP.value} ОГ`);
				memberAnkett.push(`> 6. ${memberPurpose.value}`);
				memberAnkett.push(`> 7. ${memberCharacterRole.value}`);
				//
				// Send starting message
			    interaction.editReply('Начинаю процесс авторизации...')
			    //
			} else {
				interaction.editReply('Анкета заполнена неверно! В анкете не может быть пустых полей!')
			}

			//Verification of the questionnaire for veracity
			if (checkMessage(memberAnkett)) {
				memberAnkett.forEach((row, index) => {
					errorsStructure.push(...(checkIssueRow(row, index,)));
				})
		    //
			//Check banned words into anket
				memberAnkett.forEach((row, index) => {
					errorsBannedWord.push(...(checkBannedWords(row, index)));
				})
			//
			// Send some errors if find in anket
				if (errorsStructure.length > 0 || errorsBannedWord.length > 0 || errorsStructure.length && errorsBannedWord > 0) {
					interaction.editReply(errorsStructure.join("\n") + "\n" + errorsBannedWord.join("\n"));
					return;
				}
			//
				if (hasGeneralRole === false) {
					setTimeout(() => {
						//set General Role
						setGeneralRoleInteraction(interaction, memberAnkett)
						console.log('General role received');
					}, 3000)

					setTimeout(() => {
						//set character role
						setCharacterRoleInteraction(interaction, memberAnkett);
						console.log('Character role received');
					}, 4000)
					setTimeout(() => {
						//set Nickname
						setUserNicknameInteraction(interaction, memberAnkett);
						console.log('Member nickname changed');
					}, 5000)
					setTimeout(() => {
						//Send complete message authorize
						interaction.user.send({ embeds: [AcceptEmbed] });
						console.log('Message about complete authorize sent');
					}, 6000)

					//Send Message to archive
					setTimeout(() => {
						sendMessageToArchiveInteraction(channel_Archive, interaction, memberAnkett, anketEmbed);
						console.log('Message to archive sended')
					}, 7000)
					//Send welcome message
					setTimeout(() => {
						interaction.channel.send(`Добро Пожаловать <@${interaction.user.id}> в Стражи Безумия!` + '');
						setTimeout(() => {
							reactOnJoinMessageInteraction(channel, interaction);
							console.log('Welcome message sended and reacted');
						}, 2000)

					}, 8000)
				} 
			}

		}
	}
})


// Send Welcome Message
client.on('guildMemberAdd', member => {
	// sendWelcomeMessage(member);
	leftMemberMessage(member, leftEmbed);
});
// 

// Send member left message
client.on('guildMemberRemove', member =>{
	leftMemberMessage(member, leftEmbed);
})

//////////Alpha functions

// Create Branch with Trial Anket 
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	if (interaction.commandName === 'hike') {
		const channel = client.channels.cache.get(process.env.ARCHIVE_SEND)
		const trial = interaction.options.get('trial');
		const hike_date = interaction.options.get('date');
		const hike_type = interaction.options.get('type');
		const raidLeaderRole = interaction.options.get('leader');

		const thread = await channel.threads.create({
			name: trial.value,
			autoArchiveDuration: 60,
			reason: 'Need this thread'
		});

		trialAnketSend(trial, hike_date, hike_type, raidLeaderRole, thread, interaction, client);
		interaction.editReply('Thread created ' + thread.name);
	}

})

//Button Interaction
client.on('interactionCreate', async interaction => {
	if(!interaction.isButton()) return;

	reactTrialAnket(interaction);
})
//

//////////


client.once('ready', () => {
	console.log("Discord bot online")
	client.user.setActivity({
		name: 'Elder Bugs Online',
		type: ActivityType.Playing
	})
});
client.login(process.env.TOKEN);
