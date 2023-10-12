//Imports
const {
    messageIssueRowsMap,
    messageBannedWordsMap
} = require('./bot_consts')
//

//Funtions
function checkMessage(arr) {
    if (arr.length === 8) {
      return true;
    }else {
      false;
    }
  }
  
function checkMessageRow(row, pattern){
return pattern.test(row)
}
  
function checkIssueRow(row, index){
if (!messageIssueRowsMap[index]) return [];
const errors = [];
messageIssueRowsMap[index].forEach(object =>{
    if (!checkMessageRow(row, object.regExp)){
        errors.push(object.error);
    }
})
return errors;
}
  
function checkBannedWords(row, index){
if (!messageBannedWordsMap[index]) return [];
const errors = [];
messageBannedWordsMap[index].forEach(object =>{
    if (checkMessageRow(row, object.regExp)){
        errors.push(object.error);
    }
})
return errors;
}
  
function setUserNickname (message, arr){
//reg UserID
    const regUserID = / ([A-Z-a-z0-9.,$_]+)/g;
    //reg Name
    const regName = /([А-Яа-я]+)/g;
    //parse userId & Name
    const userID = arr[1].match(regUserID);
    const name = arr[1].match(regName)
    const nickname = userID[1] + ' ' + '(' + name[0] + ')';
    message.member.setNickname(nickname);
}
  
function setGeneralRole (message){
const role = message.guild.roles.cache.find(r => r.id === process.env.ROLE_GENERAL);
message.member.roles.add(role);
}

function setCharacterRole(message, arr){
//find role by id
const roleTank = message.guild.roles.cache.find(r => r.id == process.env.ROLE_TANK);
const roleHealer = message.guild.roles.cache.find(r => r.id == process.env.ROLE_HEALER);
const roleDamager = message.guild.roles.cache.find(r => r.id == process.env.ROLE_DAMAGER);

if (parseRoles = arr[7].match(regexpThreeRoles)) {
    if (parseRoles[1].match(/(Танк|Целитель|Damager)/) || parseRoles[2].match(/(Танк|Целитель|Damager)/) || parseRoles[3].match(/(Танк|Целитель|Damager)/) ){
    message.member.roles.add(roleTank);
    message.member.roles.add(roleHealer);
    message.member.roles.add(roleDamager);
    }
}else if (parseRoles = arr[7].match(regexpTwoRoles)) {
    if (parseRoles[1].match(/(Танк|Целитель)/) && parseRoles[2].match(/(Танк|Целитель)/)){
    message.member.roles.add(roleTank);
    message.member.roles.add(roleHealer);
    }else if (parseRoles[1].match(/(Танк|Дамагер)/) && parseRoles[2].match(/(Танк|Дамагер)/)) {
    message.member.roles.add(roleTank);
    message.member.roles.add(roleDamager);
    }else if (parseRoles[1].match(/(Целитель|Дамагер)/) && parseRoles[2].match(/(Целитель|Дамагер)/)) {
    message.member.roles.add(roleHealer);
    message.member.roles.add(roleDamager);
    }
}else if (parseRoles = arr[7].match(regexpOneRole)) {
    if (parseRoles[1].match(/(Танк)/)){
    message.member.roles.add(roleTank);
    }else if (parseRoles[1].match(/(Целитель)/)) {
    message.member.roles.add(roleHealer);
    } else if (parseRoles[1].match(/(Дамагер)/)) {
    message.member.roles.add(roleDamager);
    }
}
} 

function sendErrorEmbed(message, errors, channel, embed){
    channel.send({embeds:[embed.setDescription(errors.join("\n")).setFooter({text:`${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` })]});
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
    sendErrorEmbed
};
//