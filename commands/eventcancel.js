module.exports = {
    name: 'ecancel',
    description: "Lets users cancel ranked duel challenges!",
    execute(msg, args, coconut, walnut, challengers, challenge){
        if (challengers.includes(msg.author.id)) {
            let z = challengers.indexOf(msg.author.id);
            challenge.splice(z, 1);
            challengers.splice(z, 1);
            walnut.splice(z, 1);
            coconut.splice(z, 1);
            msg.reply('You have cancelled your event duel request!');
        } else {
            msg.reply('You are not currently challenging anyone to a duel!');
        }
    }
}