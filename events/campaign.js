const { ButtonBuilder, ButtonStyle, ActionRowBuilder, createComponent, ComponentType, ButtonInteraction } = require('discord.js');
const e = require('express');
const {
    dsrAnket,
    crAnket,
} = require('../src/bot_consts')

//////////Alpha Functions
async function trialAnketSend(trial_name, hike_date, hike_type, raidLeaderRole, thread, interaction, client, message) {

    const trialAnketMap = {
        'Риф Зловещих Парусов': dsrAnket,
        'Клаудрест': crAnket
    };

    //Make Unix Timestamp
    const [dateComponents, timeComponents] = hike_date.value.split(' ');
    const [month, day, year] = dateComponents.split('/');
    const [hours, minutes, seconds] = timeComponents.split(':');

    const date = new Date(
        +year,
        month - 1,
        +day,
        +hours,
        +minutes,
        +seconds,
    );

    const unixTimestamp = Math.floor(date.getTime() / 1000);
    //

    const memberStatus = `**Группа:** 1 из 12 участников`;
    const regExpRaidLeaderTank = /Tank/g;
    const regExpRaidLeaderHealer = /Healer/g;
    const regExpRaidLeaderDamager = /Damager/g;

    const buttonUnicKey = Math.random().toString(36).substring(7);
    const data = new Map();

    const tankButton = new ButtonBuilder()
        .setLabel('Tank')
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`tankButton_${buttonUnicKey}`)

    const healerButton = new ButtonBuilder()
        .setLabel('Healer')
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`healerButton_${buttonUnicKey}`)

    const damagerButton = new ButtonBuilder()
        .setLabel('Damager')
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`damagerButton_${buttonUnicKey}`)

    const buttonsRow = new ActionRowBuilder().addComponents(tankButton, healerButton, damagerButton);
    data.set(buttonUnicKey, buttonsRow);

    const trialAnket = `:Calendar: <t:${unixTimestamp}:D> :clock~1: <t:${unixTimestamp}:t>  ${hike_type.value} (длительность **2 часа 30 минут**)\n`;
    [...trial_name.value.matchAll(/Риф Зловещих Парусов|Клаудрест/g)].forEach((match) => {
        if (match[0]) {
            if (raidLeaderRole.value.match(regExpRaidLeaderTank)) {
                thread.send({ content: `${trialAnket}\n ${trialAnketMap[match[0]]}\n${memberStatus}\n1. <@${interaction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`, components: [buttonsRow] });
            }
            else if (raidLeaderRole.value.match(regExpRaidLeaderHealer)) {
                thread.send({ content: `${trialAnket}\n ${trialAnketMap[match[0]]}\n${memberStatus}\n1. <@${interaction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`, components: [buttonsRow] });
            }
            else if (raidLeaderRole.value.match(regExpRaidLeaderDamager)) {
                thread.send({ content: `${trialAnket}\n ${trialAnketMap[match[0]]}\n${memberStatus}\n1. <@${interaction.user.id}> ${raidLeaderRole.value} [Raid Leader]\n`, components: [buttonsRow] });
            }
            console.log(thread.id)

            //Archived
            // reactTrialAnket(trialAnket, trialAnketMap[match[0]], raidLeaderRole, interaction, client);
        }
    });

}

function reactTrialAnket(interaction) {

    //Consts members
    const tankArr = [];
    const healerArr = [];
    const damagerArr = [];
    const memberList = [];

    //Get message 
    var message = interaction.message.content.split('\n');

    //get Raid Leader Role
    var getRaidLeaderRole = message[24].split(' ');
    var raidLeaderRole = getRaidLeaderRole[2];

    //get Raid LeaderID
    var RaidLeaderID = getRaidLeaderRole[1].slice(2, 21);
 

    // Add raid leader to character role arr.
    if (raidLeaderRole.match(/Tank/)) {
        const raidLeaderTank = `<@${RaidLeaderID}> ${raidLeaderRole} [Raid Leader]\n`;
        tankArr.push(`${raidLeaderTank}`);
    } else if (raidLeaderRole.match(/Healer/)) {
        const raidLeaderHealer = `<@${RaidLeaderID}> ${raidLeaderRole} [Raid Leader]\n`;
        healerArr.push(`${raidLeaderHealer}`);
    } else if (raidLeaderRole.match(/Damager/)) {
        const raidLeaderDamager = `<@${RaidLeaderID}> ${raidLeaderRole} [Raid Leader]\n`;
        damagerArr.push(`${raidLeaderDamager}`);
    }


    const trialAnketMap = {
        'Риф Зловещих Парусов': dsrAnket,
        'Клаудрест': crAnket
    };

    ///Frozen
    // const reserveTankArr = [];
    // const reserveHealerArr = [];
    // const reserveDamagerArr = [];
    ///

    var memberCounter = 0;
    var anketBody = '';

    // //get Trial Name from Anket
    var trial_name = interaction.channel.name;

    //get Trial Handler 
    var trialAnket = message[0];

    // console.log(message);


    [...trial_name.matchAll(/Риф Зловещих Парусов|Клаудрест/g)].forEach((match) => {
        if (match[0]) {
            anketBody = (trialAnketMap[match[0]]);
        }
    })

    console.log(message);





    // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

    const reserveList = [];

    // const userId = new RegExp(`(${user.id})`, 'g');

    // Add members to character role arr
    if (!interaction.isButton()) return;
    console.log(`${interaction.user.id} press the button`);

    // Get Button Id
    const buttonId = interaction.customId;
    // Get anketId by buttonID
    // const surveyId = buttonId.split('_')[1];
    // find anket by ID
    // const survey = data.get(surveyId);

    // const threadID = interaction.channelId;
    // console.log(`Thread id ${threadID} and Button id ${buttonId}`);

    if (interaction.customId.match('tankButton')) {

        if (interaction.user.id === RaidLeaderID) {
            if (healerArr.join('').match(interaction.user.id)) {
                const index = healerArr.indexOf(`<@${interaction.user.id}>`)
                healerArr.splice(index, 1);

                tankArr.push((`<@${interaction.user.id}> Tank [Raid Leader]` + '\n'))
            } else if (damagerArr.join('').match(interaction.user.id)) {
                const index = damagerArr.indexOf(`<@${interaction.user.id}>`)
                damagerArr.splice(index, 1);

                tankArr.push((`<@${interaction.user.id}> Tank [Raid Leader]` + '\n'))
            }
            else if (RaidLeaderID === interaction.user.id && !healerArr.join('').match(RaidLeaderID) || damagerArr.join('').match(RaidLeaderID)) {
                const index = tankArr.indexOf(`<@${interaction.user.id}>`)
                tankArr.splice(index, 1);
                interaction.message.delete();
                // thread.delete();
            }
        } else {
            if (!tankArr.join('').match(interaction.user.id) || !healerArr.join('').match(interaction.user.id) || !damagerArr.join('').match(interaction.user.id)) {
                tankArr.push((`<@${interaction.user.id}> Tank` + '\n'))
            }
            else if (healerArr.join('').match(interaction.user.id)) {
                const index = healerArr.indexOf(`<@${interaction.user.id}>`)
                healerArr.splice(index, 1);

                tankArr.push((`<@${interaction.user.id}> Tank` + '\n'))
            } else if (damagerArr.join('').match(interaction.user.id)) {
                const index = damagerArr.indexOf(`<@${interaction.user.id}>`)
                damagerArr.splice(index, 1);

                tankArr.push((`<@${interaction.user.id}> Tank` + '\n'))
            }
            else if (tankArr.join('').match(interaction.user.id) && !healerArr.join('').match(interaction.user.id) || !damagerArr.join('').match(interaction.user.id)) {
                const index = tankArr.indexOf(`<@${interaction.user.id}>`)
                tankArr.splice(index, 1);
                interaction.reply(`<@${interaction.user.id}> - Выписался с триала !!!!`)
            }
        }
    }
    else if (interaction.customId.match('healerButton')) {

        if (interaction.user.id === RaidLeaderID) {
            if (tankArr.join('').match(interaction.user.id)) {
                const index = tankArr.indexOf(`<@${interaction.user.id}>`)
                tankArr.splice(index, 1);

                healerArr.push((`<@${interaction.user.id}> Healer [Raid Leader]` + '\n'))
            } else if (damagerArr.join('').match(interaction.user.id)) {
                const index = damagerArr.indexOf(`<@${interaction.user.id}>`)
                damagerArr.splice(index, 1);

                healerArr.push((`<@${interaction.user.id}> Healer [Raid Leader]` + '\n'))
            }
            else if (RaidLeaderID === interaction.user.id && !tankArr.join('').match(RaidLeaderID) || !damagerArr.join('').match(RaidLeaderID)) {
                const index = healerArr.indexOf(`<@${interaction.user.id}>`)
                healerArr.splice(index, 1);
                interaction.message.delete();
                // thread.delete();
            }
        } else {
            if (!tankArr.join('').match(interaction.user.id) || !healerArr.join('').match(interaction.user.id) || !damagerArr.join('').match(interaction.user.id)) {
                healerArr.push((`<@${interaction.user.id}> Healer` + '\n'))
            }
            else if (tankArr.join('').match(interaction.user.id)) {
                const index = tankArr.indexOf(`<@${interaction.user.id}>`)
                tankArr.splice(index, 1);

                healerArr.push((`<@${interaction.user.id}> Healer` + '\n'))
            } else if (damagerArr.join('').match(interaction.user.id)) {
                const index = damagerArr.indexOf(`<@${interaction.user.id}>`)
                damagerArr.splice(index, 1);

                healerArr.push((`<@${interaction.user.id}> Healer` + '\n'))
            }
            else if (healerArr.join('').match(interaction.user.id) && !tankArr.join('').match(interaction.user.id) || !damagerArr.join('').match(interaction.user.id)) {
                const index = healerArr.indexOf(`<@${interaction.user.id}>`)
                healerArr.splice(index, 1);
                interaction.reply(`<@${interaction.user.id}> - Выписался с триала !!!!`)
            }
        }
    }
    else if (interaction.customId.match('damagerButton')) {

        if (interaction.user.id === RaidLeaderID) {

            if (healerArr.join('').match(interaction.user.id)) {
                const index = healerArr.indexOf(`<@${interaction.user.id}>`)
                healerArr.splice(index, 1);

                damagerArr.push((`<@${interaction.user.id}> Damager [Raid Leader]` + '\n'))

            } else if (tankArr.join('').match(interaction.user.id)) {
                const index = tankArr.indexOf(`<@${interaction.user.id}>`)
                tankArr.splice(index, 1);

                damagerArr.push((`<@${interaction.user.id}> Damager [Raid Leader]` + '\n'))
            }
            else if (RaidLeaderID === interaction.user.id && !healerArr.join('').match(RaidLeaderID) || tankArr.join('').match(RaidLeaderID)) {
                const index = damagerArr.indexOf(`<@${interaction.user.id}>`)
                damagerArr.splice(index, 1);
                interaction.message.delete();
                // thread.delete();
            }
        } else {
            if (!tankArr.join('').match(interaction.user.id) && !healerArr.join('').match(interaction.user.id) && !damagerArr.join('').match(interaction.user.id)) {
                damagerArr.push((`<@${interaction.user.id}> Damager` + '\n'))
            }
            else if (healerArr.join('').match(interaction.user.id)) {
                const index = healerArr.indexOf(`<@${interaction.user.id}>`)
                healerArr.splice(index, 1);

                damagerArr.push((`<@${interaction.user.id}> Damager` + '\n'))
            } else if (tankArr.join('').match(interaction.user.id)) {
                const index = tankArr.indexOf(`<@${interaction.user.id}>`)
                tankArr.splice(index, 1);

                damagerArr.push((`<@${interaction.user.id}> Damager` + '\n'))
            }
            else if (damagerArr.join('').match(interaction.user.id) && !healerArr.join('').match(interaction.user.id) || !tankArr.join('').match(interaction.user.id)) {
                const index = damagerArr.indexOf(`<@${interaction.user.id}>`)
                damagerArr.splice(index, 1);
                interaction.reply(`<@${interaction.user.id}> - Выписался с триала !!!!`)
            }
        }
    }

    // Add members to union member list 
    tankArr.forEach((row, index) => {
        memberList.push(`${index + 1}. ${row}`)
    })
    healerArr.forEach((row, index) => {
        memberList.push(`${index + 3}. ${row}`)
    })
    damagerArr.forEach((row, index) => {
        memberList.push(`${index + 5}. ${row}`)
    })

    console.log(`Member list ${memberList}`);
    //Add members to reserve (frozen)
    // reserveTankArr.forEach((row, index) => {
    //     reserveList.push(`${index + 1}. ${row}`)
    // })
    // reserveHealerArr.forEach((row, index) => {
    //     reserveList.push(`${index + 3}. ${row}`)
    // })
    // reserveDamagerArr.forEach((row, index) => {
    //     reserveList.push(`${index + 5}. ${row}`)
    // })


    // Count all members and edit trial message
    memberCounter = tankArr.length + healerArr.length + damagerArr.length;
    const memberStatus = `**Группа:** ${memberCounter} из 12 участников`;

    // frozen
    // const reserveStatus = `**Резерв**`
    // 

    // Search trial anket message 
    if (memberList.length > 0) {
        // const allMessages = await thread.messages.fetch();
        // const messageId = [];
        // const regExpBodyMessage = /активностью\sвы\sсоглашаетесь/g;

        // allMessages.forEach(message => {
        //     if (message.content.match(regExpBodyMessage)) {
        //         messageId.push(message.id)
        //     }
        // })
        // const AnketMessage = (await allMessages).find(message => message.id === messageId[0]);

        // find nessessary thread
        // const channel = client.channels.cache.get(process.env.ARCHIVE_SEND)
        // const nThread = channel.threads.cache.find(i => i.id === threadID)


        interaction.message.edit(`${trialAnket}\n\n ${anketBody}\n${memberStatus}\n${memberList.join("")}`);
    }
    //







    // if (reserveList.length === 0) {

    // } 
    // // frozen
    // // else {
    // //     thread.lastMessage.edit(`${trialAnket}\n ${trialAnketMap}\n${memberStatus}\n${memberList.join("")}\n ${reserveStatus}\n${reserveList.join("")}`);
    // // }



}
//////////


//Exports
module.exports = {
   //Trial Anket exports
       trialAnketSend,
       reactTrialAnket,
   //
   };