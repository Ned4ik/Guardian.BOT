const Discord = require("discord.js");
require('dotenv').config();
const moment = require('moment');

const{
leftEmbed,
} = require('../src/bot_consts')

// Send Welcome Message funtion
function sendWelcomeMessage(member) {
    const memberAuthorizeChannel = member.guild.channels.cache.get(process.env.MEMBER_AUTHORIZE_CHANNEL);
    memberAuthorizeChannel.send(`Добро Пожаловать <@${member.user.id}> в **Guardians of Madness**\n` + '\n' +
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
//

// Send leftMemberMessage function
function leftMemberMessage(member, embed){
    const leftMessage = member.guild.channels.cache.get(process.env.SYSTEM_NOTIFICATION_CHANNEL);
        if(member.user.avatar === null) {
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`<@${member.user.id}> **вышел**`)
                .setThumbnail(`${member.user.defaultAvatarURL}`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(member.user.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }else{
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`<@${member.user.id}> **вышел**`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(member.user.joinedAt).format('l' +'  '+'LT')}`})
        ]})
    }
   
   
}
//

// Send kickMemberMessage function
function kickMemberMessage(executor, target, reason, embed){
    const guild = target.client.guilds.cache.get(process.env.GUILD_ID);
    const leftMessage = guild.channels.cache.get(process.env.SYSTEM_NOTIFICATION_CHANNEL);
    if (reason === null){
        if(target.avatar === null) {
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`${target} **был исключен**`)
                .setFields(
                    {name: 'Исключил:', value: `${executor}`}
                )
                .setThumbnail(`${member.user.defaultAvatarURL}`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(target.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }else{
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`${target} **был исключен**`)
                .setFields(
                    {name: 'Исключил:', value: `${executor}`}
                )
                .setThumbnail(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png?size=256`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(target.joinedAt).format('l' +'  '+'LT')}`})
            ]})
        }
    }else {
        if(target.avatar === null) {
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`${target} **был исключен**`)
                .setFields(
                    {name: `Причина:`, value: `${reason}`, inline: true},
                    {name: 'Исключил:', value: `${executor}`, inline: true},
                )
                .setThumbnail(`${member.user.defaultAvatarURL}`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(target.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }else{
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`${target} **был исключен**`)
                .setFields(
                    {name: `Причина:`, value: `${reason}`, inline: true},
                    {name: 'Исключил:', value: `${executor}`, inline: true},
                )
                .setThumbnail(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png?size=256`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(target.joinedAt).format('l' +'  '+'LT')}`})
            ]})
        }
    }
    
}
//

//Send guildBanMessage functions
function memberBanMessage(executor, reason, ban, embed){
    const leftMessage = ban.guild.channels.cache.get(process.env.SYSTEM_NOTIFICATION_CHANNEL);

    if(reason !== null){
        if(ban.user.avatar === null) {
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`<@${ban.user.id}> **был забанен.**`)
                .setFields(
                    {name: `**Причина:**`, value: `${reason}`, inline: true},
                    {name: '**Выдано:**', value: `${executor}`, inline: true},
                )
                .setThumbnail(`${ban.user.defaultAvatarURL}`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(ban.user.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }else{
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`<@${ban.user.id}> **был забанен.**`)
                .setFields(
                    {name: `**Причина:**`, value: `${reason}`, inline: true},
                    {name: '**Выдано:**', value: `${executor}`, inline: true},
                )
                .setThumbnail(`https://cdn.discordapp.com/avatars/${ban.user.id}/${ban.user.avatar}.png?size=256`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(ban.user.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }
    }else {
        if(ban.user.avatar === null) {
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`<@${ban.user.id}> **был забанен.**`)
                .setFields(
                    {name: '**Выдано:**', value: `${executor}`, inline: true},
                )
                .setThumbnail(`${ban.user.defaultAvatarURL}`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(ban.user.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }else{
            leftMessage.send({embeds: [embed
                .setTitle(`Системное уведомление`)
                .setDescription(`<@${ban.user.id}> **был забанен.**`)
                .setFields(
                    {name: '**Выдано:**', value: `${executor}`, inline: true},
                )
                .setThumbnail(`https://cdn.discordapp.com/avatars/${ban.user.id}/${ban.user.avatar}.png?size=256`)
                .setFooter({text: `Guardians of Madness` + `\t\t\t${moment(ban.user.joinedAt).format('l' +'  '+'LT')}`})
            ]})
           
        }
    }
    
}
//



//Exports
module.exports = {
    // memberActivity exports
       sendWelcomeMessage,
       leftMemberMessage,
       memberBanMessage,
       kickMemberMessage,
   //
}
   