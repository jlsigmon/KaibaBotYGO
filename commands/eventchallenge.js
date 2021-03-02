module.exports = {
    name: 'echallenge',
    description: "Lets users challenge each other to a event duel!",
    execute(msg, args, coconut, walnut, challengers, challenge, signer, darksigner){
        if(msg.channel.name !== 'general-dueling' && (msg.member.roles.has(signer.id) || msg.member.roles.has(darksigner.id))){
            if (args[1] && !challengers.includes(msg.author.id)) {
                var son = msg.mentions.members.first();

                if (!challenge.includes(son.id) && son.id !== msg.author.id && !son.bot && (son.roles.has(signer.id) || son.roles.has(darksigner.id))) {
                    if((msg.member.roles.has(signer.id) && son.roles.has(signer.id)) || (msg.member.roles.has(darksigner.id) && son.roles.has(darksigner.id))){
                        msg.reply("You cannot challenge someone on the same team as you!");
                        return;
                    }
                    coconut[coconut.length] = msg.mentions.members.first();
                    walnut[walnut.length] = msg.member;
                    challengers[challengers.length] = msg.author.id;
                    challenge[challenge.length] = son.id;
                    msg.channel.sendMessage(son + ", you have been challenged to a event duel by " + msg.author + "!");
                }
                else if (challenge.includes(son.id)) {
                    msg.reply('That user is already in a duel!');
                }
                else if (son.id === msg.author.id) {
                    msg.reply('You cannot challenge youself silly!')
                }
                else if (son.bot) {
                    msg.reply('You cannot challenge a bot to a duel!')
                }

            } else if (challengers.includes(msg.author.id)) {
                msg.reply('You are already challenging someone to a duel!');
            }
            if (!args[1]) {
                msg.reply('Please provide a user to challenge!');
            }
        } else {
            msg.reply("You do not have permission to use that command!");
        }
    }
}