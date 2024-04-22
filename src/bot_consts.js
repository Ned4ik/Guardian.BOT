const { EmbedBuilder, Message } = require("discord.js");
const {
  regExpLatinBannWords,
  regExpCirilicBannWords,
  regExpZeroRowBody,
  regExpFivRowBody,
  regExpSixthRowBody,
} = require('./regular_expression')

// Authorize validation maps
const messageIssueRowsMap = {
  0: [
    {
      regExp: regExpZeroRowBody,
      error: "* Указаный игровой айди или имя не оответствует требованиям. \n * P.S. Убедитесь что вы указали игровой айди без [@]! А имя написано кирилицей!."
    }
  ],
  4: [
    {
      regExp: regExpFivRowBody,
      error: "* Заполнения пункта №5 не оответствует требованиям.  \n * P.S. Убедитесь что пункте используются тволько кирилица.",
    }
  ],
  5: [
    {
      regExp: regExpSixthRowBody,
      error: "* Заполнение пункта №6 не оответствует требованиям.  \n * P.S. Убедитесь в отсуствии лишних символов, и что роли написаны через тире.",
    }
  ]
}

const messageBannedWordsMap = {
  0: [
    {
      regExp: regExpLatinBannWords,
      error: '* Нецензурные слова в UserID запрещенны'
    },
    {
      regExp: regExpCirilicBannWords,
      error: '* Нецензурные слова в Имени запрещенны'
    }
  ],
  5: [
    {
      regExp: regExpCirilicBannWords,
      error: '* Ненормативная лексика в пункте №6 запрещенна'
    }
  ],
}
//

// Trial Ankets consts
const dsrAnket = `:Trial: vDSR  - ветеранский. Риф Зловещих Парусов. (Дополнение - Высокий остров)
       
**Требования**
> 1. 500 ЧП
> 2. 70К ДПС (Железный Атронах) - Амальгама
> 3. Ознакомится с видео-гайдом <#1112437285053550652>
> 4. Ознакомится с правилами поведения в походах <#1104797284945907763>
**Наличие аддонов**
> 1. Raid Notifier
> 2. Hodor Reflexes
> 3. OdySupportIcons
> 4. CrutchAlerts
**Наличие расходников**
> 1. Зелья, еда и напитки.
> 2. Ремонтные комплекты.
> 3. Камни Душ.

:Discord_warning:**Примечание** _Поставив реакцию под этой активностью вы соглашаетесь, со всеми правилами, которые обязуетесь выполнить._

_Сбор в <#1104807708303044609> за 15 минут до начала._
`

const crAnket = `:Trial: vCR  - ветеранский. Клаудрест. (Дополнение - Саммерсет)
       
**Требования**
> 1. 500 ЧП
> 2. 70К ДПС (Железный Атронах) - Амальгама
> 3. Ознакомится с видео-гайдом <#1132961012883140668>
> 4. Ознакомится с правилами поведения в походах <#1104797284945907763>
**Наличие аддонов**
> 1. Raid Notifier
> 2. Hodor Reflexes
> 3. OdySupportIcons
> 4. CrutchAlerts
**Наличие расходников**
> 1. Зелья, еда и напитки.
> 2. Ремонтные комплекты.
> 3. Камни Душ.

:Discord_warning:**Примечание** _Поставив реакцию под этой активностью вы соглашаетесь, со всеми правилами, которые обязуетесь выполнить._

_Сбор в <#1104807708303044609> за 15 минут до начала._
`
//


//// Create Embed
const leftEmbed = new EmbedBuilder()
  .setTitle(` `)
  .setColor('#1e1f22')

const anketEmbed = new EmbedBuilder()
  .setTitle('АНКЕТА УЧАСТНИКА')
  .setColor('Default')

const AcceptEmbed = new EmbedBuilder()
.setColor('Green')
.setTitle('Авторизация пройдена успешно' + ' <a:accepted:1164918880062427247>')
.setDescription('### Мини гайд по дискорд серверу' +
'\n* <#1104797284945907763> - Обязательно ознакомся с гильдейскими правилами.' +
'\n* <#1104803380028772534> - Здесь ты сможешь найти расписание походов на текущую неделю и записатся в них.' + 
'\n* <#1104800043707408424> - Гильдейская энциклопедия, здесь ты сможешь найти гайды для Подземелий и Триалов, так же там находятся гильдейские логи и многое другое.')
//// 


module.exports = {
  leftEmbed,
  anketEmbed,
  AcceptEmbed,
  messageIssueRowsMap,
  messageBannedWordsMap,
  dsrAnket,
  crAnket,
};