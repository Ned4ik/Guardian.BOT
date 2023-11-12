require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commads = [
  {
    name: 'hike',
    description: 'Create a branch with trial hike',
    options: [
      {
        name: 'trial',
        description: 'Enter name of Trial',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'Cloudrest',
            value: 'Клаудрест',
          },
          {
            name: 'Dreadsail Reef',
            value: 'Риф Зловещих Парусов',
          }
        ]
      },
      {
        name: 'month',
        description: 'Choose month of hike',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'November',
            value: 'Ноябрь',
          }
        ]
      },
      {
        name: 'date',
        description: 'Enter number day of hike',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'day',
        description: 'Choose a day of hike',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'Friday',
            value: 'Пятница',
          }
        ]
      },
      {
        name: 'time',
        description: 'Choose time of hike',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: '20:00',
            value: '20:00',
          }
        ]
      },
      {
        name: 'type',
        description: 'Choose type of hike',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'Education',
            value: 'Обучающий поход',
          },
          {
            name: 'Farming',
            value: 'Фармовый поход',
          }
        ]
      },
      {
        name: 'leader',
        description: 'Raid Leader role',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'Tank',
            value: 'tank',
          },
          {
            name: 'Healer',
            value: 'healer',
          }, 
          {
            name: 'Damager',
            value: 'damager',
          },
        ]
      },
    ]
  },
];
 
const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);
  (async () => {
    try{
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        {body: commads}
      )
      console.log('Command register successfully!')
    } catch (error)
    {
      console.log(`There was an error: ${error}`)
    }
  })();
  