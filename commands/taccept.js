module.exports = {
    name: 'taccept',
    description: "Lets users accept duel challenges!",
    execute(msg, args, walnut, challenge){
        if (challenge.includes(msg.author.id)) {
            var n = challenge.indexOf(msg.author.id);
            msg.channel.send(walnut[n].username + ', Your wild challenge has been accepted!');

        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}