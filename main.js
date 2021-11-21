
const { Client, Intents, MessageEmbed, DiscordAPIError, Collection} = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '-';

const fs = require('fs');
const Discord = require('discord.js');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // go into commands folder and get all the .js files
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('The NotWorkingBot is Online');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/); //split our command to have multiple commands
    const command = args.shift().toLowerCase();

    if( command === 'command'){
        client.commands.get('command').execute(message, args, MessageEmbed);
    }

    if( command == 'ping'){
        client.commands.get('ping').execute(message,args);
    }
    if( command == 'ticket'){
        message.channel.send("ticket system has some bugs because wakaka is a bad programmer");
    }
});



client.login('blank')
