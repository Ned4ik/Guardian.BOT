require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commads = [
  // {
  //   name: 'hike',
  //   description: 'Create a branch with trial hike',
  //   options: [
  //     {
  //       name: 'trial',
  //       description: 'Enter name of Trial',
  //       type: ApplicationCommandOptionType.String,
  //       choices: [
  //         {
  //           name: 'Cloudrest',
  //           value: 'Клаудрест',
  //         },
  //         {
  //           name: 'Dreadsail Reef',
  //           value: 'Риф Зловещих Парусов',
  //         }
  //       ]
  //     },
  //     {
  //       name: 'date',
  //       description: 'Enter number day of hike',
  //       type: ApplicationCommandOptionType.String,
  //     },
  //     {
  //       name: 'type',
  //       description: 'Choose type of hike',
  //       type: ApplicationCommandOptionType.String,
  //       choices: [
  //         {
  //           name: 'Education',
  //           value: 'Обучающий поход',
  //         },
  //         {
  //           name: 'Farming',
  //           value: 'Фармовый поход',
  //         }
  //       ]
  //     },
  //     {
  //       name: 'leader',
  //       description: 'Raid Leader role',
  //       type: ApplicationCommandOptionType.String,
  //       choices: [
  //         {
  //           name: 'Tank',
  //           value: 'Tank',
  //         },
  //         {
  //           name: 'Healer',
  //           value: 'Healer',
  //         }, 
  //         {
  //           name: 'Damager',
  //           value: 'Damager',
  //         },
  //       ]
  //     },
  //   ],

  // },
  ////////// Authorize command
  {
    name: 'authorize',
    name_localizations: {
      "ru": "авторизация",
      'uk': "авторизація",
    },
    description: 'Authorize member to guild.',
    description_localizations: {
      'ru': 'Авторизация участников в гильдию.',
      'uk': "Авторизація учасників у гільдію.",
    },
    options: [
      {
        name: 'id',
        name_localizations: {
          "ru": "айди",
          'uk': "айді",
        },
        description: 'Enter your UserID.',
        description_localizations: {
          'ru': 'Укажите ваш игровой айди.',
          'uk': "Вкажіть ваш Ігровий айді.",
        },
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: 'name',
        name_localizations: {
          "ru": "имя",
          'uk': "імя",
        },
        description: 'Enter your real name or nickmane.',
        description_localizations: {
          'ru': 'Укажите ваше имя или прозвище.',
          'uk': "Вкажіть ваше ім`я або прізвисько.",
        },
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: 'guild_member',
        name_localizations: {
          "ru": "участник_гильдии",
          "uk": "учасник_гільдії",
        },
        description: 'Are you guild member into game?.',
        description_localizations: {
          'ru': 'Являетесь ли вы участником гильдии в игре?.',
          "uk": "Чи являєтесь ви учасником гільдії у грі?",
        },
        type: ApplicationCommandOptionType.String,
        require: true,
        choices: [
          {
            name: 'Yes',
            name_localizations: {
              "ru": "Да",
              "uk": "Так",
            },
            value: 'Да',
          },
          {
            name: 'No',
            name_localizations: {
              "ru": "Нет",
              "uk": "Ні",
            },
            value: 'Нет',
          }
        ]
      },
      {
        name: 'age',
        name_localizations: {
          "ru": "возраст",
          "uk": "вік",
        },
        description: 'Enter your age.',
        description_localizations: {
          'ru': 'Укажите свой возраст.',
          "uk": "Вкажіть ваш вік.",
        },
        type: ApplicationCommandOptionType.Number,
        require: true,
        min_value: 14,
        max_value: 70,

    
      },
      {
        name: 'cp',
        name_localizations: {
          "ru": "очки_героя",
          "uk": "бали_героя",
        },
        description: 'Enter amount of your champion points.',
        description_localizations: {
          'ru': 'Укажите количество очков героя.',
          "uk": "Вкажіть кількість балів героя.",
        },
        type: ApplicationCommandOptionType.Number,
        require: true,
        min_value: 10,
        max_value: 3600,
      },
      {
        name: 'characters',
        name_localizations: {
          "ru": "персонажи",
          "uk": "персонажі",
        },
        description: 'Enter role(s) of your character(s) separated by dashes.',
        description_localizations: {
          'ru': 'Укажите роль(и) персонажа(ей) через тире',
          "uk": "Вкажіть роль(і) персонажа(ів через тире).",
        },
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: 'purpose',
        name_localizations: {
          "ru": "цель",
          "uk": "ціль",
        },
        description: 'Enter your purpose introduction in guild.',
        description_localizations: {
          'ru': 'Укажите вашу цель вступления в гильдию.',
          "uk": "Вкажіть вашу ціль вступу до гільдії.",
        },
        type: ApplicationCommandOptionType.String,
        require: true,
      }
    ]

    
  },
  //////////
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
  