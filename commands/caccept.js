module.exports = {
    name: 'caccept',
    description: "Lets users accept duel challenges!",
    execute(msg, args, walnut, challenge){
        if (challenge.includes(msg.author.id)) {
            var n = challenge.indexOf(msg.author.id);
            msg.channel.sendMessage(walnut[n] + ', Your challenge has been accepted!');

        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}