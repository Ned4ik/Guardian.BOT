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
  regExpSeventhRowNumber,
  regExpSeventhRowBody
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
      error: '--Неправильно оформлен номер пункта 3 ',
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
      error: "Неправильно оформлен четвертый пункт",
    }
  ],
  5: [
    {
      regExp: regExpFivRowNumber,
      error: "Неправильно оформлен номер пункта 5",
    },
    {
      regExp: regExpFivRowBody,
      error: "Неправильно указано количество Очков Героя",
    }
  ],
  6: [
    {
      regExp: regExpSixthRowNumber,
      error: "Неправильно оформлен номер пункта 6!",
    },
    {
      regExp: regExpSixthRowBody,
      error: "Неправильно оформлен шестой пункт",
    }
  ],
  7: [
    {
      regExp: regExpSeventhRowNumber,
      error: "Неправильно оформлен номер пункта 7",
    },
    {
      // check this part 
      regExp: regExpSeventhRowBody,
      error: "Неправильно указана роль в седьмом пункте",
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

//Bot const
//


//// Create Embed
const WarningEmbed = new EmbedBuilder()
.setColor('Yellow')
.setTitle('Стражи Безумия')
.setDescription(' ')

const ErrorEmbed = new EmbedBuilder()
.setColor('Red')
.setTitle('Oшибка авторизации')
.setFooter({text: ' '})

module.exports = {
  WarningEmbed, 
  ErrorEmbed,
  messageIssueRowsMap,
  messageBannedWordsMap,
};