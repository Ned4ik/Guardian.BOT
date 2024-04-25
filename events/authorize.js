//Imports
const moment = require('moment');

const {
    hasGuild,
    regexpOneRole
} = require('../src/regular_expression');

const{
    messageIssueRowsMap,
    messageBannedWordsMap,
} = require('../src/bot_consts')
//

////////// Authorize functions
function checkMessage(arr) {
    return arr.length === 6
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

function setGeneralRoleInteraction(interaction, arr) {
    const roleBlade = interaction.guild.roles.cache.find(r => r.id === process.env.BASE_ROLE);
    const roleFriendly = interaction.guild.roles.cache.find(r => r.id === process.env.GUEST_ROLE);
    if (hasGuild.test(arr[1])) {
        interaction.member.roles.add(roleBlade);
    } else {
        interaction.member.roles.add(roleFriendly);
    }
}

function setCharacterRoleInteraction(interaction, arr) {
    //find role by id
    const roleTank = interaction.guild.roles.cache.find(r => r.id == process.env.TANK_ROLE);
    const roleHealer = interaction.guild.roles.cache.find(r => r.id == process.env.HEALER_ROLE);
    const roleDamager = interaction.guild.roles.cache.find(r => r.id == process.env.DAMAGER_ROLE);

    // send to const
    const rolesMap = {
        "Танк": roleTank,
        "Целитель": roleHealer,
        "Дамагер": roleDamager,
        "ДД": roleDamager,
        "Хил": roleHealer,
        "Хіл": roleHealer,
        "Цілитель": roleHealer,
        "Шкодник": roleDamager,
        "танк": roleTank,
        "целитель": roleHealer,
        "дамагер": roleDamager,
        "дд": roleDamager,
        "хил": roleHealer,
        "хіл": roleHealer,
        "цілитель": roleHealer,
        "шкодник": roleDamager,
    };

    [...arr[5].matchAll(regexpOneRole)].forEach((match) => {
        if (match[0]) {
            interaction.member.roles.add(rolesMap[match[0]]);
        }
    });

}

function setUserNicknameInteraction(interaction, arr) {
    //reg UserID
    const regUserID = /\s([A-Z-a-z0-9.,`'$_]+)/g;
    //reg Name
    const regName = /([А-Яа-яё]+)/g;
    //parse userId & Name
    const userID = arr[0].match(regUserID);
    const name = arr[0].match(regName)
    const nickname = userID[1] + ' ' + '(' + name[0][0].toUpperCase() + name[0].substring(1) + ')';
    interaction.member.setNickname(nickname);
}

async function reactOnJoinMessageInteraction(channel, interaction) {
    const allMessages = await channel.messages.fetch();
    const messageId = [];
    const userId = new RegExp(`(${interaction.user.id})`, 'g');
    const regExpBodyMessage = /Добро\sПожаловать\s/g;

    allMessages.forEach(message => {
        if (message.content.match(userId) && message.content.match(regExpBodyMessage)) {
            messageId.push(message.id)
        }
    })
    const onJoinMessage = (await allMessages).find(message => message.id === messageId[0]);
    onJoinMessage.react('<:file_137107035:1161183389894856704>');
    onJoinMessage.react('<:file_137107103:1161198656733577236>');
    onJoinMessage.react('<:file_137107091:1161198567445250068>');
    onJoinMessage.react('<:file_137107045:1161183430554419261>');
    onJoinMessage.react('<a:Cheering_Fox:1115153842657566740>');
}

function sendMessageToArchiveInteraction(channel, interaction, memberAnket, embed) {
    const hasGeneralRole = interaction.member.roles.cache.has(process.env.BASE_ROLE);
    if (hasGeneralRole) {
        if(interaction.user.avatar === null){
            channel.send({embeds: [embed
                .setColor('#1e1f22')
                .setDescription(`${memberAnket.toString().replaceAll(',','\n')}\n\n <@${interaction.user.id}>\n`)
                .setThumbnail(`${interaction.user.defaultAvatarURL}`)
                .setFooter({ text: `Guardians of Madness`  + `\t\t${moment(interaction.user.joinedAt).format('l' +'  '+'LT')}`})] });
        }else{
            channel.send({embeds: [embed
                .setColor('#1e1f22')
                .setDescription(`${memberAnket.toString().replaceAll(',','\n')}\n\n <@${interaction.user.id}>\n`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
                .setFooter({ text: `Guardians of Madness` + `\t\t${moment(interaction.user.joinedAt).format('l' +'  '+'LT')}`})] });
        }
        
    } else {
      if(interaction.user.avatar === null){
        channel.send({embeds: [embed.setColor('#FF3C00').setDescription(`${memberAnket.toString().replaceAll(',','\n')}\n\n <@${interaction.user.id}>\n`).setThumbnail(`${interaction.user.defaultAvatarURL}`).setFooter({ text: `Guardians of Madness` + `\t\t${moment(interaction.user.joinedAt).format('l' +'  '+'LT')}`})]} );
      }else{
        channel.send({embeds: [embed.setColor('#FF3C00').setDescription(`${memberAnket.toString().replaceAll(',','\n')}\n\n <@${interaction.user.id}>\n`).setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`).setFooter({ text: `Guardians of Madness` + `\t\t${moment(interaction.user.joinedAt).format('l' +'  '+'LT')}`})]});
      }
    }
    
    //Maybe need it
    // content:'### Требуется приглашение в гильдию! ||@here||',
    //
    
}

//////////

//Exports
module.exports = {
    // Authorize exports
       checkIssueRow,
       checkBannedWords,
       checkMessage,
       setGeneralRoleInteraction,
       setCharacterRoleInteraction,
       setUserNicknameInteraction,
       sendMessageToArchiveInteraction,
       reactOnJoinMessageInteraction,
   //
}