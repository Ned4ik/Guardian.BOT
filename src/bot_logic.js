//Imports
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, createComponent, ComponentType, ButtonInteraction } = require('discord.js');
const {
    messageIssueRowsMap,
    messageBannedWordsMap,
    dsrAnket,
    crAnket,
} = require('./bot_consts')
const {
    hasGuild,
    regexpOneRole
} = require('./regular_expression')
//

//Funtions
function checkMessage(arr) {
    return arr.length === 8
}
function checkMessageRow(row, pattern) {
    return pattern.test(row)
}

function checkIssueRow(row, index) {
    if (!messageIssueRowsMap[index]) return [];
    const errors = [];
    messageIssueRowsMap[index].forEach(object => {
        if (!checkMessageRow(row, object.regExp)) {
            errors.push(object.error);
        }
    })
    return errors;
}

function checkBannedWords(row, index) {
    if (!messageBannedWordsMap[index]) return [];
    const errors = [];
    messageBannedWordsMap[index].forEach(object => {
        if (checkMessageRow(row, object.regExp)) {
            errors.push(object.error);
        }
    })
    return errors;
}

function setUserNickname(message, arr) {
    //reg UserID
    const regUserID = /\s([A-Z-a-z0-9.,$_]+)/g;
    //reg Name
    const regName = /([А-Яа-яё]+)/g;
    //parse userId & Name
    const userID = arr[1].match(regUserID);
    const name = arr[1].match(regName)
    const nickname = userID[1] + ' ' + '(' + name[0][0].toUpperCase() + name[0].substring(1) + ')';
    message.member.setNickname(nickname);
}

function setGeneralRole(message, arr) {
    const roleBlade = message.guild.roles.cache.find(r => r.id === process.env.ROLE_GENERAL);
    const roleFriendly = message.guild.roles.cache.find(r => r.id === process.env.ROLE_FRIENDLY);
    if (hasGuild.test(arr[3])) {
        message.member.roles.add(roleBlade);
    } else {
        message.member.roles.add(roleFriendly);
    }
}

function setCharacterRole(message, arr) {
    //find role by id
    const roleTank = message.guild.roles.cache.find(r => r.id == process.env.ROLE_TANK);
    const roleHealer = message.guild.roles.cache.find(r => r.id == process.env.ROLE_HEALER);
    const roleDamager = message.guild.roles.cache.find(r => r.id == process.env.ROLE_DAMAGER);

    // send to const
    const rolesMap = {
        "Танк": roleTank,
        "Целитель": roleHealer,
        "Дамагер": roleDamager,
        "ДД": roleDamager,
        "Хил": roleHealer
    };

    [...arr[7].matchAll(regexpOneRole)].forEach((match) => {
        if (match[0]) {
            message.member.roles.add(rolesMap[match[0]]);
        }
    });

}

function sendErrorEmbed(errors, errorBanned, message, embed) {
    message.delete();
    message.author.send({ embeds: [embed.setDescription(errors.join("\n") + "\n" + errorBanned.join("\n"))] });
}

function sendMessageToArchive(channel, message) {
    const hasGeneralRole = message.member.roles.cache.has(process.env.ROLE_GENERAL);
    if (hasGeneralRole) {
        message.delete();
        channel.send(`${message.content}`);
    } else {
        message.delete();
        channel.send(`${message.content}\n <@&1104817155637248031> Киньте приглашение в гильдию вот этой печеньке <@${message.author.id}>`);
    }
}

function giveAssistantRole(userMessage, role, message) {

    const userID = userMessage[1].split(/[<@>,]/);
    const user = message.guild.members.cache.find(user => user.id === `${userID[2]}`);
    const hasAssistantRole = message.member.roles.cache.has(process.env.ROLE_ASSISTANT);

    if (hasAssistantRole === false) {
        setTimeout(() => {
            message.delete();
            user.roles.add(role);
            message.channel.send(`Роль ${role} успешно выдана участнику <@${userID[2]}> <a:accepted:1164918880062427247>`);
        }, 2000)
        setTimeout(() => {
            const member = message.guild.members.cache.find(user => user.id === `${userID[2]}`);
            member.roles.remove(role);
            message.channel.send(`Роль ${role} успешно убрана в участника <@${userID[2]}> <a:error_red:1164919280345821237>`);
        }, 3000 * 60 * 60)
    } else {
        message.channel.send('Роль уже выдана <a:divine_warning:1164918996236255345>')
    }


}

async function deleteWelcomeMessage(message) {
    // Const for function
    const allMessages = await message.channel.messages.fetch();
    const messageId = [];
    const userId = new RegExp(`(${message.author.id})`, 'g');
    //

    // Take all message from channel & Find necessary message by mention user & get ID
    allMessages.forEach(message => {
        if (message.content.match(userId)) {
            messageId.push(message.id)
        }
    })
    // Find necessary welcome message & delete him 
    const welcomeMessage = allMessages.find(message => message.id === messageId[0]);
    welcomeMessage.delete();
}

function sendWelcomeMessage(member) {
    const welcomeChannel = member.guild.channels.cache.get(process.env.AUTHCOMMAND_CHANNEL);
    welcomeChannel.send(`Добро Пожаловать <@${member.user.id}> в **Guardians of Madness**\n` + '\n' +
        '* Для начала ознакомься с правилами сообщества в канале <#1104797284945907763>\n' + '\n' +
        '**Авторизацию проводит БОТ**\n' +
        '* В начале анкеты должна присутствовать команда ``!Авторизация``, структура анкеты должна соответствовать примеру. P.S. В конце каждого пункта не должно быть пробела.\n' + '\n' +
        '**ПРИМЕР ЗАПОЛНЕНИЯ АНКЕТЫ:  P.S. СКОПИРУЙ И ПОДСТАВЬ СВОИ ДАННЫЕ.**\n' +
        '```\n' +
        '!Авторизация\n' +
        '> 1. Nedchik - (Богдан)\n' +
        '> 2. В чате игры\n' +
        '> 3. Да/Нет\n' +
        '> 4. 24 года\n' +
        '> 5. 1991 ОГ\n' +
        '> 6. Проходить ПВЕ контент\n' +
        '> 7. Танк, Целитель, Дамагер, ДД, Хил\n' +
        '```\n' +
        '** ЗНАЧЕНИЯ ПУНКТОВ: **\n' +
        '> 1. UserID - (Имя или Прозвище **P.S. Кириллицей**)\n' +
        '> 2. Откуда узнали про гильдию ?\n' +
        '> 3. Являетесь членом гильдии в игре ?\n' +
        '> 4. Сколько вам лет ?\n' +
        '> 5. Какое у вас количество ОГ ?\n' +
        '> 6. Чем вы планируете заниматся в рамках гильдии ?\n' +
        '> 7. За какие роли вы играете ?\n' + '\n' +
        '<:Discord_warning:1104859345117786242> Игроки, прошедшие авторизацию в дискорде и являющиеся членами гильдии в игре, получают роль <@&1104818103826780271>.\n' +
        'Игроки, не вступившие в гильдию в игре, получают роль с ограничениями - <@&1122934650441056366>.\n');
}

async function reactOnJoinMessage(channel, message) {
    const allMessages = await channel.messages.fetch();
    const messageId = [];
    const userId = new RegExp(`(${message.author.id})`, 'g');
    const regExpBodyMessage = /Добро\sПожаловать\s/g;

    allMessages.forEach(message => {
        if (message.content.match(userId) && message.content.match(regExpBodyMessage)) {
            messageId.push(message.id)
        }
    })
    const onJoinMessage = (await allMessages).find(message => message.id === messageId[0]);
    onJoinMessage.react('<a:Wave_Fox:1089529003620171807>');
    onJoinMessage.react('<:file_137107048:1161183442655002675>');
    onJoinMessage.react('<:file_137107045:1161183430554419261>');
    onJoinMessage.react('<a:Cheering_Fox:1115153842657566740>');
    onJoinMessage.react('<a:happy_fox_dance:1115153869433995284>');
}

//Alpha Functions
// async function reactTrialAnket(thread, trialAnket, trialAnketMap, raidLeaderRole, commandInteraction, client) {

//     const tankArr = [];
//     const healerArr = [];
//     const damagerArr = [];

//     const reserveTankArr = [];
//     const reserveHealerArr = [];
//     const reserveDamagerArr = [];

//     const MAX_REACTIONS = 12;
//     var memberCounter = 0;
//     var tankButtonClick = 0;


//     // Add raid leader to character role arr.
//     if (raidLeaderRole.value.match(/tank/)) {
//         const raidLeaderTank = `<@${commandInteraction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`;
//         tankArr.push(`${raidLeaderTank}`);
//     } else if (raidLeaderRole.value.match(/healer/)) {
//         const raidLeaderHealer = `<@${commandInteraction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`;
//         healerArr.push(`${raidLeaderHealer}`);
//     } else if (raidLeaderRole.value.match(/damager/)) {
//         const raidLeaderDamager = `<@${commandInteraction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`;
//         damagerArr.push(`${raidLeaderDamager}`);
//     }

//     //Create Tank filter
//     // const filter = (reaction, user) => {
//     //     return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && !user.bot;
//     // };



//     //Create Tank Collector
//     // const collector = thread.lastMessage.createReactionCollector({ filter, max: MAX_REACTIONS });

//     //Button Filter 
//     //doesen`t work
//     // const filter = (i) => i.user.id === interaction.button.clicker.user.id;
//     // console.log();

//     // //Button Collector 
//     // const collector = thread.lastMessage.createMessageComponentCollector({
//     //     filter,
//     //     componentType: ComponentType.Button,

//     // })

//     //Run Colletor Tank
//     client.on('interactionCreate', async (interaction) => {
//         // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
//         const memberList = [];
//         const reserveList = [];
//         const hasRaidLeaderRole = interaction.member.roles.cache.has(process.env.ROLE_RAIDLEADER);
//         // const userId = new RegExp(`(${user.id})`, 'g');

//         // Add members to character role arr
//         if (!interaction.isButton()) return;
//         console.log(`${interaction.user.id} press the button`);
        



//     if (interaction.customId === 'tankButton') {
//         tankButtonClick++;
//         console.log(tankButtonClick);
           
//             if (hasRaidLeaderRole === true)
//             {
//                 switch(tankButtonClick){
//                     case 1: 
//                     if (tankArr.join('').match(`${interaction.user.id}`)) {
//                         tankArr.splice(`<@${interaction.user.id}>`, 1);
//                         console.log(`delete user by id ${interaction.user.id}`);
//                         reserveTankArr.push((`<@${interaction.user.id}> Tank [Raid Leader]` + '\n'))
//                     }
//                     break;
//                     case 2:
//                         reserveTankArr.splice(`<@${interaction.user.id}>`, 1);
//                         thread.lastMessage.delete();
//                         thread.delete();
//                     break;
//                 }
//             }
             
            

//             //     if (tankArr.length < 2 ) {
//             //         // if use this in multiple thread (discord send error DiscordAPIError[10062]);
//             //             // await interaction.deferUpdate();
//             //         //
//             //         if (!tankArr.join('').match(interaction.user.id)){
//             //             tankArr.push(`<@${interaction.user.id}> Tank` + '\n');
//             //         }else{
//             //             tankArr.splice(`<@${interaction.user.id}>`, 1);
//             //             console.log(`delete user by id ${interaction.user.id}`);
//             //             reserveTankArr.push((`<@${interaction.user.id}> Tank` + '\n'))
//             //         }
//             //         // if (!tankArr.join('').match(interaction.user.id) && !healerArr.join('').match(interaction.user.id) && !damagerArr.join('').match(interaction.user.id)) {
//             //         //     tankArr.push(`<@${interaction.user.id}> Tank` + '\n');
//             //         // }else{

//             //         // }
//             //     } else {
//             //         if (!tankArr.join('').match(interaction.user.id)){
//             //             reserveTankArr.push((`<@${interaction.user.id}> Tank` + '\n'));
//             //         }else{
//             //             tankArr.splice(`<@${interaction.user.id}>`, 1);
//             //             console.log(`delete user by id ${interaction.user.id}`);
//             //             reserveTankArr.push((`<@${interaction.user.id}> Tank` + '\n'))

//             //         }

//             //     }
//             // } else if (interaction.customId === 'healerButton') {
//             //     if (healerArr.length < 2) {
//             //         healerArr.push(`<@${interaction.user.id}> Healer` + '\n');
//             //         // if (!healerArr.join('').match(userId) && !tankArr.join('').match(userId) && !damagerArr.join('').match(userId)) {

//             //         // }
//             //     }else {
//             //         reserveHealerArr.push((`<@${interaction.user.id}> Healer` + '\n'));
//             //     }
//             // } else if (interaction.customId === 'damagerButton') {
//             //     if (damagerArr.length < 8) {
//             //         damagerArr.push(`<@${interaction.user.id}> Damager` + '\n');
//             //         // if (!damagerArr.join('').match(userId) && !healerArr.join('').match(userId) && !tankArr.join('').match(userId) ) {

//             //         // }
//             //     }else{
//             //         reserveDamagerArr.push((`<@${ interaction.user.id}> Damager` + '\n'));
//             //     }
//         }

//         // Add members to union member list 
//         tankArr.forEach((row, index) => {
//             memberList.push(`${index + 1}. – ${row}`)
//         })
//         healerArr.forEach((row, index) => {
//             memberList.push(`${index + 3}. ${row}`)
//         })
//         damagerArr.forEach((row, index) => {
//             memberList.push(`${index + 5}. ${row}`)
//         })

//         //Add members to reserve
//         reserveTankArr.forEach((row, index) => {
//             reserveList.push(`${index + 1}. ${row}`)
//         })
//         reserveHealerArr.forEach((row, index) => {
//             reserveList.push(`${index + 3}. ${row}`)
//         })
//         reserveDamagerArr.forEach((row, index) => {
//             reserveList.push(`${index + 5}. ${row}`)
//         })

//         // Count all members and edit trial message
//         memberCounter = tankArr.length + healerArr.length + damagerArr.length;
//         const memberStatus = `**Группа:** ${memberCounter} из 12 участников`;
//         const reserveStatus = `**Резерв**`

//         if (reserveList.length === 0) {
//             thread.lastMessage.edit(`${trialAnket}\n ${trialAnketMap}\n${memberStatus}\n${memberList.join("")}`);
//         } else {
//             thread.lastMessage.edit(`${trialAnket}\n ${trialAnketMap}\n${memberStatus}\n${memberList.join("")}\n ${reserveStatus}\n${reserveList.join("")}`);
//         }



//     })

//     // collector.on('end', (collected, reason) => {
//     //     // if the emoji is clicked the MAX_REACTIONS times
//     //     if (reason === 'limit')
//     //         console.log(`We've just reached the maximum of ${MAX_REACTIONS} reactions.`);
//     // });


// }

// async function trialAnketSend(trial_name, hikeTime, hike_month, hike_day_digit, hike_type, raidLeaderRole, thread, interaction, client) {

//     const trialAnketMap = {
//         'Риф Зловещих Парусов': dsrAnket,
//         'Клаудрест': crAnket
//     };

//     const memberStatus = `**Группа:** 1 из 12 участников`;
//     const regExpRaidLeaderTank = /tank/g;
//     const regExpRaidLeaderHealer = /healer/g;
//     const regExpRaidLeaderDamager = /damager/g;

//     const tankButton = new ButtonBuilder()
//         .setLabel('Tank')
//         .setStyle(ButtonStyle.Primary)
//         .setCustomId('tankButton')

//     const healerButton = new ButtonBuilder()
//         .setLabel('Healer')
//         .setStyle(ButtonStyle.Primary)
//         .setCustomId('healerButton')

//     const damagerButton = new ButtonBuilder()
//         .setLabel('Damager')
//         .setStyle(ButtonStyle.Primary)
//         .setCustomId('damagerButton')

//     const buttonsRow = new ActionRowBuilder().addComponents(tankButton, healerButton, damagerButton);

//     const trialAnket = `:Calendar: ${hike_day_digit.value} ${hike_month.value} :clock~1: ${hikeTime.value}  ${hike_type.value}  (длительность **2 часа 30 минут**)\n`;
//     [...trial_name.value.matchAll(/Риф Зловещих Парусов|Клаудрест/g)].forEach((match) => {
//         if (match[0]) {
//             if (raidLeaderRole.value.match(regExpRaidLeaderTank)) {
//                 thread.send({ content: `${trialAnket}\n ${trialAnketMap[match[0]]}\n${memberStatus}\n1. <@${interaction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`, components: [buttonsRow] });
//             }
//             else if (raidLeaderRole.value.match(regExpRaidLeaderHealer)) {
//                 thread.send({ content: `${trialAnket}\n ${trialAnketMap[match[0]]}\n${memberStatus}\n1. <@${interaction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`, components: [buttonsRow] });
//             }
//             else if (raidLeaderRole.value.match(regExpRaidLeaderDamager)) {
//                 thread.send({ content: `${trialAnket}\n ${trialAnketMap[match[0]]}\n${memberStatus}\n1. <@${interaction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`, components: [buttonsRow] });
//             }
//             setTimeout(() => {
//                 reactTrialAnket(thread, trialAnket, trialAnketMap[match[0]], raidLeaderRole, interaction, client);
//             }, 4000);

//         }
//     });

//     // const threadMessage = await thread.fetch();
//     // setTimeout(() => {
//     //     threadMessage.lastMessage.react('1️⃣');
//     //     threadMessage.lastMessage.react('2️⃣');
//     //     threadMessage.lastMessage.react('3️⃣');
//     // }, 2000)

// }
//

//Exports
module.exports = {
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
};
//