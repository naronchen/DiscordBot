const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();

/***
queue(message.guild.id, 
        queue_constructor object{ 
            voice channel, text channel, connection, song[]
        }
**/

module.exports = {
    name: 'play',
    aliases:['skip', 'stop'], //Two Commands
    cooldown: 0,
    description: 'Music Bot',
    async execute(message, args, cmd, client, Discord){

        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute Command');
        const permissions = voice_channel.premissionFor(Message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send("Correct Permission plssss");
        if(!permissions.has('SPEAK')) return message.channel.send("Correct Permission plssss");

        const server_queue = queue.get(message.guild.id); //get from global queue to see if server has a spot in global map

        if(cmd === 'play'){
            if (!args.length) return message.channel.send('You need to send the second argument!')
            let song = {};

            if (ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info, videoDetails, video_url }
            } else {
                //if the video is not a URL then use keywords to find that video
                const video_finder = async (query) =>{
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1)? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = {title: video.title, url: video.url}
                    message.channel.send('Error finding video OR you discovered Naron made one of his many mistakes')
                }
            }
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [] 
                }

                queue.set(message.guild.id, queue_constructor);
                queue_constructor.song.push(song);

                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection; //establish connection by joining voice channel
                    video_player(message.guild, queue_constructor.songs[0]); // song[0] is the current song playing
                } catch(err){
                    queue.delete(message.guild);
                    message.channel.send('There was an error connecting! OR you discovered Naron made one of his many mistakes');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(song.title + 'ADDED to queue Sucessfullyyyyy');
                }
        }

        else if(cmd === 'skip') skip_song(meesage, server_queue);
        else if(cmd === 'stop') stop_song(meesage, server_queue);

    }

}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song){ // whole queue empty, dont play song
        song_queue.voice_channel.leave(); // leave global queue
        queue.delete(guild.id);
        return;
    }
        const stream = ytdl(song.url, { filter: 'audio only'});
        song_queue.connection.play(stream, {seek:0 ,volume:0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });

        await song_queue.text_channel.send(' Now playing')
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('you need to be in a channel OR you discovered Naron made one of his many mistakes')
    if(!server_queue) return message.channel.send("No queue, Cant skip a song OR Naron is not making it work")
    server_queue/connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (message.member.voice.channel) return message.channel.send('plss be in a channel');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end()
}