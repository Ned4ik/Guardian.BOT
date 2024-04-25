const Discord = require("discord.js");
require('dotenv').config();
const moment = require('moment');


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
       leftMemberMessage,
       memberBanMessage,
       kickMemberMessage,
   //
}
   