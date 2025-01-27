module.exports = {
    name: 'cdecline',
    description: "Lets users decline duel challenges!",
    execute(msg, args, coconut, walnut, challengers, challenge){
        if (challenge.includes(msg.author.id)) {
            var n = challenge.indexOf(msg.author.id);
            challenge.splice(n, 1);
            coconut.splice(n, 1);
            msg.channel.sendMessage(walnut[n] + ', Your challenge has been declined!');
            challengers.splice(n, 1);
            walnut.splice(n, 1);
        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}