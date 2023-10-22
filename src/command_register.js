require('dotenv').config();
const {REST, Routes} = require('discord.js');

const commads = [
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
  