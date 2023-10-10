const {EmbedBuilder, Client} = require("discord.js");
const { parse } = require("dotenv");

// // Create Embed
 const alertEmbed = new EmbedBuilder()
.setColor('f2f2f2')
.setTitle('Стражи Безумия')
.setDescription(' ')
//

const autorizeEmbed = new EmbedBuilder()
.setColor('f2f2f2')
.setDescription('Для того чтобы пройти авторизацию заполните и отправьте следующую анкету!!' + ' ```\n> 1. Nedchik - Богдан \n> 2. Через список в игре TSO. \n> 3. 24 года \n> 4. 1800 \n> 5. Принимать активное участие, ходить в рейды или подземелья, общаться.\n> 6. Танк\n```   ' );

// Need make more option
const messageIssueRowsMap = {
  0: [
    {
      regExp: /^(!)(Авторизация)$/,
      error: 'Неверно указан префикс '
    }
  ],
  1: [
    {
      regExp:/^([1])+\. ([A-Z-a-z0-9]+) \- ([а-яА-Я]+)$/,
      error: "Неправильно оформлен первый пункт:"
    },
    {
      regExp: /^([1])+\. /,
      error: '--Неправильно оформлен номер пункта 1 ',
    },
    {
      regExp: / ([A-Z-a-z0-9]+) \- ([а-яА-Я]+)$/,
      error: '--Неправильно оформленны UserID и имя в первом пункте ',
    },
  ],
  2: [
    {
      regExp: /^([2])+\. /,
      error: '--Неправильно оформлен номер пункта 2 ',
    },
    {
      regExp: /^([2])+\. ([а-яА-яA-Z-a-z]+.{19})$/,
      error: "Неправильно оформлен второй пункт",
    }
  ],
  3: [
    {
      regExp: /^([3])+\. /,
      error: "Неправильно оформлен номер пункта 3",
    },
    {
      regExp: /^([3])+\. ([0-9]+) ([а-я].{3})$/,
      error: "Неправильно оформлен третий пункт",
    }
  ],
  4: [
    {
      regExp: /^([4])+\. /,
      error: "Неправильно оформлен номер пункта 4",
    },
    {
      regExp: /^([4])+\. (\d{4})$/,
      error: "Неправильно указано количество Очков Героя",
    }
  ],
  5: [
    {
      regExp: /^([5])+\. /,
      error: "Неправильно оформлен номер пункта 5!",
    },
    {
      regExp: /^([5])+\. (\W{2,70})$/,
      error: "Неправильно оформлен пятый пункт",
    }
  ],
  6: [
    {
      regExp: /^([6])+\. /,
      error: "Неправильно оформлен номер пункта 6",
    },
    {
      // chech this part 
      regExp: /^([6])+\. (Танк|Целитель|Дамагер)+$|^([6])+\. (Танк|Целитель|Дамагер)+\, (Танк|Целитель|Дамагер)$|^([6])+\. (Танк|Целитель|Дамагер)+\, (Танк|Целитель|Дамагер)\, (Танк|Целитель|Дамагер)$/m,
      error: "Неправильно указана роль в шестом пункте",
    }, 
  ]
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

function setUserNickname (message, arr){

  //reg UserID
	const regUserID = / ([A-Z-a-z0-9]+)/g;
	//reg Name
  const regName = /([А-Яа-я]+)/g;
	//parse userId & Name
	const userID = arr[1].match(regUserID);
	const name = arr[1].match(regName)
  const nickname = userID[0] + ' ' + '(' + name[0] + ')';
  message.member.setNickname(nickname);
  console.log(nickname);
}

function setGeneralRole (message){
  const role = message.guild.roles.cache.find(r => r.id === process.env.ROLE_GENERAL);
  message.member.roles.add(role);
  (message.member.roles.add(role));
}
function setCharacterRole(message, arr){
  //find role by id
  const roleTank = message.guild.roles.cache.find(r => r.id == process.env.ROLE_TANK);
  const roleHealer = message.guild.roles.cache.find(r => r.id == process.env.ROLE_HEALER);
  const roleDamager = message.guild.roles.cache.find(r => r.id == process.env.ROLE_DAMAGER);
  // regular expression
  const regexp =  / (Танк|Целитель|Дамагер)$/;
  const regexp2 = / (Танк|Целитель|Дамагер)\, (Танк|Целитель|Дамагер)$/m;
  const regexp3 = / (Танк|Целитель|Дамагер)\, (Танк|Целитель|Дамагер)\, (Танк|Целитель|Дамагер)$/m;
  
  if (parseRoles = arr[6].match(regexp3)) {
    if (parseRoles[1].match(/(Танк|Целитель|Damager)/) || parseRoles[2].match(/(Танк|Целитель|Damager)/) || parseRoles[3].match(/(Танк|Целитель|Damager)/) ){
      message.member.roles.add(roleTank);
      message.member.roles.add(roleHealer);
      message.member.roles.add(roleDamager);
    }
  }else if (parseRoles = arr[6].match(regexp2)) {
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
  }else if (parseRoles = arr[6].match(regexp)) {
    if (parseRoles[1].match(/(Танк)/)){
      message.member.roles.add(roleTank);
    }else if (parseRoles[1].match(/(Целитель)/)) {
      message.member.roles.add(roleHealer);
    } else if (parseRoles[1].match(/(Дамагер)/)) {
      message.member.roles.add(roleDamager);
    }
  }
} 

module.exports = {
    alertEmbed, 
    autorizeEmbed,
    checkIssueRow, 
    setUserNickname,
    setGeneralRole,
    setCharacterRole
    
};