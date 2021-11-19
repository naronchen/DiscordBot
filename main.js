
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '-';

client.once('ready', () => {
    console.log('The NotWorkingBot is Online');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/); //split our command to have multiple commands
    const command = args.shift().toLowerCase();

    if( command === 'ping'){
        message.channel.send('pong!');
    }else if (command === 'youtube'){
        message.channel.send('Go to work');
    }
});










client.login('OTExMTI2MDIwMDE3NTAwMjAy.YZc2Ow.Qm4fD7jdFiM61ZglbmtaV79EQpY')
