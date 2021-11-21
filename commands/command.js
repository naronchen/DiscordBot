module.exports = {
    name: 'command',
    description: 'Embeds!',
    execute(message, args, MessageEmbed){
        const newEmbed = new MessageEmbed()
        .setColor('#c0d6e4')
        .setTitle('Here is a youtube link to some coding music I use all the time')
        .setURL('https://www.youtube.com/watch?v=PY8f1Z3nARo&ab_channel=JomaTech')
        .setDescription('This is a embed for the server rules')
        .addFields(
            { name: 'Rule 1', value: 'Look at Rule 2'},
            { name: 'Rule 2', value: 'Look at Rule 3'},
            { name: 'Rule 3', value: 'Bao!'}
        )
        .setImage('https://i.pinimg.com/originals/58/b1/80/58b180bcba5a92d7d95c58153c9ce5b2.png')
        .setFooter('Make sure to sleep early');

        message.channel.send({embeds:[newEmbed]});
    }
}

