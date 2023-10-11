const {EmbedBuilder} = require("discord.js");
const {
  regExpLatinBannWords,
  regExpCirilicBannWords,
  regExpIndex,
  regExpFirstRow,
  regExpFirstRowNumber,
  regExpFirstRowBody,
  regExpSecondRowNumber,
  regExpSecondRowBody,
  regExpThirdRowNumber,
  regExpThirdRowBody,
  regExpFoureRowNumber,
  regExpFoureRowBody,
  regExpFivRowNumber,
  regExpFivRowBody,
  regExpSixthRowNumber,
  regExpSixthRowBody,
  regexpOneRole,
  regexpTwoRoles,
  regexpThreeRoles,
} = require('./regular_expression')

// Regular expression consts
const messageIssueRowsMap = {
  0: [
    {
      regExp: regExpIndex,
      error: 'Неверно указан префикс '
    }
  ],
  1: [
    {
      regExp: regExpFirstRow,
      error: "Неправильно оформлен первый пункт:"
    },
    {
      regExp: regExpFirstRowNumber,
      error: '--Неправильно оформлен номер пункта 1 ',
    },
    {
      regExp: regExpFirstRowBody,
      error: '--Неправильно оформленны UserID и имя в первом пункте ',
    },
  ],
  2: [
    {
      regExp: regExpSecondRowNumber,
      error: '--Неправильно оформлен номер пункта 2 ',
    },
    {
      regExp: regExpSecondRowBody,
      error: "Неправильно оформлен второй пункт",
    }
  ],
  3: [
    {
      regExp: regExpThirdRowNumber,
      error: "Неправильно оформлен номер пункта 3",
    },
    {
      regExp: regExpThirdRowBody,
      error: "Неправильно оформлен третий пункт",
    }
  ],
  4: [
    {
      regExp: regExpFoureRowNumber,
      error: "Неправильно оформлен номер пункта 4",
    },
    {
      regExp: regExpFoureRowBody,
      error: "Неправильно указано количество Очков Героя",
    }
  ],
  5: [
    {
      regExp: regExpFivRowNumber,
      error: "Неправильно оформлен номер пункта 5!",
    },
    {
      regExp: regExpFivRowBody,
      error: "Неправильно оформлен пятый пункт",
    }
  ],
  6: [
    {
      regExp: regExpSixthRowNumber,
      error: "Неправильно оформлен номер пункта 6",
    },
    {
      // check this part 
      regExp: regExpSixthRowBody,
      error: "Неправильно указана роль в шестом пункте",
    }, 
  ]
}

const messageBannedWordsMap = {
  1: [
    {
      regExp: regExpLatinBannWords,
      error: 'Нецензурные слова в UserID запрещенны'
    },
    {
      regExp: regExpCirilicBannWords,
      error: 'Нецензурные слова в Имени запрещенны'
    }
  ],
}
//

//// Create Embed
const alertEmbed = new EmbedBuilder()
.setColor('f2f2f2')
.setTitle('Стражи Безумия')
.setDescription(' ')

const autorizeEmbed = new EmbedBuilder()
.setColor('f2f2f2')
.setDescription('Для того чтобы пройти авторизацию заполните и отправьте следующую анкету!!' + ' ```\n> 1. Nedchik - Богдан \n> 2. Через список в игре TSO. \n> 3. 24 года \n> 4. 1800 \n> 5. Принимать активное участие, ходить в рейды или подземелья, общаться.\n> 6. Танк\n```   ' );
//

module.exports = {
  alertEmbed, 
  autorizeEmbed,
  messageIssueRowsMap,
  messageBannedWordsMap
};