module.exports = {
    name: 'eaccept',
    description: "Lets users accept ranked duel challenges!",
    execute(msg, args, walnut, challenge){
        
         if (challenge.includes(msg.author.id)) {
            var n = challenge.indexOf(msg.author.id);
            msg.channel.sendMessage(walnut[n] + ', Your event challenge has been accepted!');
        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}