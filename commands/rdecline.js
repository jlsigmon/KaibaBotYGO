module.exports = {
    name: 'rdecline',
    description: "Lets users rdecline duel challenges!",
    execute(msg, coconut, walnut, challengers, challenge){
        if (challenge.includes(msg.author.id)) {
            var n = challenge.indexOf(msg.author.id);
            challenge.splice(n, 1);
            coconut.splice(n, 1);
            msg.channel.send(walnut[n].displayName + ', Your ranked challenge has been declined!');
            challengers.splice(n, 1);
            walnut.splice(n, 1);
        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}