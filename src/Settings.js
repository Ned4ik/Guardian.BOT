const {EmbedBuilder, Client} = require("discord.js");

// // Create Embed
 const alertEmbed = new EmbedBuilder()
.setColor('f2f2f2')
.setTitle('Стражи Безумия')
.setDescription(' ')
//

const autorizeEmbed = new EmbedBuilder()
.setColor('f2f2f2')
.setDescription('Для того чтобы пройти авторизацию заполните и отправьте следующую анкету!!' + ' ```\n> 1. Nedchik - Богдан \n> 2. Через список в игре TSO. \n> 3. 24 года \n> 4. 1800 \n> 5. Принимать активное участие, ходить в рейды или подземелья, общаться.\n> 6. Танк\n```   ' );


// Check Functions
function checkPrefix(arr, pattern)
{
   return pattern.test(arr[0]);
};

const messageRowsRegMap = {
    0: /^(!)(Авторизация)/g,
    1: /^([1])+\. ([A-Z-a-z0-9]+) \- ([а-яА-Я]+) /,
    2: /^([2])+\. ([а-яА-яA-Z-a-z]+.{19}) /,
    3: /^([3])+\. ([0-9]+) ([а-я].{3}) /,
    4: /^([4])+\. (\d{4}) /,
    5: /^([5])+\. (\W{2,70}) /,
    6: /^([6])+\. (Танк||Целитель||Дамагер)+/g
    
}

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
//
module.exports = {
    alertEmbed, 
    autorizeEmbed,
    checkPrefix,
    messageRowsRegMap, 
    checkMessageRow, 
    checkIssueRow
    
};