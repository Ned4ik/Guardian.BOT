//Imports
const {
    messageIssueRowsMap,
    messageBannedWordsMap,
    roleBlade
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
    const regUserID = / ([A-Z-a-z0-9.,$_]+)/g;
    //reg Name
    const regName = /([А-Яа-яё]+)/g;
    //parse userId & Name
    const userID = arr[1].match(regUserID);
    const name = arr[1].match(regName)
    const nickname = userID[1] + ' ' + '(' + name[0] + ')';
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
        channel.send(`${message.content}\n <@&869209936830267392> Киньте приглашение в гильдию вот этой печеньке <@${message.author.id}>`);
    }
}

function giveAssistantRole(userMessage, role, message) {

    const userID = userMessage[1].split(/[<@>,]/);
    const user = message.guild.members.cache.find(user => user.id ===`${userID[2]}`);
    const hasAssistantRole = message.member.roles.cache.has(process.env.ROLE_ASSISTANT);

    if (hasAssistantRole === false) {
        setTimeout(() =>{
            message.delete();
            user.roles.add(role);
            message.channel.send(`Роль ${role} успешно выдана участнику <@${userID[2]}> <a:accepted:1164918880062427247>`);
        }, 2000)
        setTimeout(() => {
            const member = message.guild.members.cache.find(user => user.id ===`${userID[2]}`);
            member.roles.remove(role);
            message.channel.send(`Роль ${role} успешно убрана в участника <@${userID[2]}> <a:error_red:1164919280345821237>`);
        }, 3000 * 60 * 60)
    }else {
        message.channel.send('Роль уже выдана <a:divine_warning:1164918996236255345>')
    }
   

}

async function deleteWelcomeMessage(message) {
    // Const for function
    const allMessages = await message.channel.messages.fetch();
    const messageId = [];
    const userId = new RegExp(`(${message.author.id})`,'g');
    //

    // Take all message from channel & Find necessary message by mention user & get ID
		allMessages.forEach(message => {
			if (message.content.match(userId)){
                messageId.push(message.id)
			}
		})
	// Find necessary welcome message & delete him 
    const welcomeMessage = allMessages.find(message => message.id === messageId[0]);
    welcomeMessage.delete();
}

function sendWelcomeMessage(member) {
    const welcomeChannel = member.guild.channels.cache.get(process.env.AUTHCOMMAND_CHANNEL);
    welcomeChannel.send(`Добро Пожаловать <@${member.user.id}> в **Guardians of Madness**\n`+ '\n' +
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
    const userId = new RegExp(`(${message.author.id})`,'g');
    const regExpBodyMessage = /Добро\sПожаловать\s/g;

    allMessages.forEach(message => {
        if (message.content.match(userId) && message.content.match(regExpBodyMessage)){
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
    reactOnJoinMessage
};
//