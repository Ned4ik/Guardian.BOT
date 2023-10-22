const { EmbedBuilder } = require("discord.js");
const {
  regExpLatinBannWords,
  regExpCirilicBannWords,
  regExpIndex,
  regExpIndexBody,
  regExpFirstRowBody,
  regExpSecondRowBody,
  regExpThirdRowBody,
  regExpFoureRowBody,
  regExpFoureRowYear,
  regExpFivRowBody,
  regExpFivRowCP,
  regExpSixthRowBody,
  regExpSeventhRowBody,
} = require('./regular_expression')

// Command Consts
const helperRoleCommand = "!assistant";

// Regular expression consts
const messageIssueRowsMap = {
  0: [
    {
      regExp: regExpIndexBody,
      error: '* Неверно указана команда'
    },
    {
      regExp: regExpIndex,
      error: '* Неверно указан или отсуствует префикс.'
    }
  ],
  1: [
    {
      regExp: regExpFirstRowBody,
      error: "* Оформление пункта №1 не соответствует примеру. \n * P.S. Убедитесь в наличии всех символов согласно примеру, и в правильности указанного **UserID** или **Имени**)."
    }
  ],
  2: [
    {
      regExp: regExpSecondRowBody,
      error: "* Оформление пункта №2 не соответствует примеру. \n * P.S. Убедитесь в наличии всех символов согласно примеру.",
    }
  ],
  3: [
    {
      regExp: regExpThirdRowBody,
      error: "* Оформление пункта №3 не соответствует примеру. \n * P.S. Убедитесь в наличии всех символов согласно примеру.",
    }
  ],
  4: [
    {
      regExp: regExpFoureRowBody,
      error: "* Оформление пункта №4 не соответствует примеру. \n * P.S. Убедитесь в наличии всех символов согласно примеру.",
    },
    {
      regExp: regExpFoureRowYear,
      error: " - Указаный возраст не является действительным.",
    }
  ],
  5: [
    {
      regExp: regExpFivRowBody,
      error: "*  Оформление пункта №5 не соответствует примеру \n * P.S. Убедитесь в наличии всех символов согласно примеру.",
    },
    {
      regExp: regExpFivRowCP,
      error: " - Указанное количество Очков Героя не соответствует требованиям.",
    }
  ],
  6: [
    {
      regExp: regExpSixthRowBody,
      error: "* Оформление пункта №6 не соответствует примеру \n * P.S. Убедитесь в наличии всех символов согласно примеру.",
    }
  ],
  7: [
    {
      regExp: regExpSeventhRowBody,
      error: "* Оформление пункта №7 не соответствует примеру \n * P.S. Убедитесь в наличии всех символов согласно примеру. \n * Проверьте правильность написания роли(ей)",
    }
  ]
}

const messageBannedWordsMap = {
  1: [
    {
      regExp: regExpLatinBannWords,
      error: '* Нецензурные слова в UserID запрещенны'
    },
    {
      regExp: regExpCirilicBannWords,
      error: '* Нецензурные слова в Имени запрещенны'
    }
  ],
  2: [
    {
      regExp: regExpCirilicBannWords,
      error: '* Ненормативная лексика в пункте №2 запрещенна'
    }
  ],
  6: [
    {
      regExp: regExpCirilicBannWords,
      error: '* Ненормативная лексика в пункте №6 запрещенна'
    }
  ],
}
//

//// Create Embed
const WarningEmbed = new EmbedBuilder()
  .setColor('Yellow')
  .setTitle('Oшибка авторизации' + ' <a:divine_warning:1163797234215833610>')
  .setDescription('* Вы уже авторизированы')

const ErrorEmbed = new EmbedBuilder()
  .setColor('Red')
  .setTitle('Oшибка авторизации' + ' <a:error_red:1162300786638848041>')

const AcceptEmbed = new EmbedBuilder()
.setColor('Green')
.setTitle('Авторизация пройдена успешно' + ' <a:accepted:1163772553190449183>')
.setDescription('### Мини гайд по дискорд серверу' +
'\n* "Правила" - Обязательно ознакомся с гильдейскими правилами.' +
'\n* "Походы" - Здесь ты сможешь найти расписание походов на текущую неделю и записатся в них.' + 
'\n* "Поиск Стражей" - Здесь ты сможешь найти участников для прохождения груповых активностей.' +
'\n* "Forum" - Гильдейская инциклопедия, здесь ты сможешь найти гайды для Подземелий и Триалов, так же там находятся гильдейские логи и многое другое.')



module.exports = {
  WarningEmbed,
  ErrorEmbed,
  AcceptEmbed,
  messageIssueRowsMap,
  messageBannedWordsMap,
  helperRoleCommand,
};