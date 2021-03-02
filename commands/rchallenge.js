module.exports = {
    name: 'rchallenge',
    description: "Lets users challenge each other to a ranked duel!",
    execute(msg, args, coconut, walnut, challengers, challenge, rankedban){
        if(msg.channel.name !== 'general-dueling' && !msg.member.roles.cache.has(rankedban.id)){
            if (args[1] && !challengers.includes(msg.author.id)) {
                var son = msg.mentions.members.first();

                if (!challenge.includes(son.id) && son.id !== msg.author.id && !son.bot) {
                    coconut[coconut.length] = son;
                    walnut[walnut.length] = msg.member;
                    challengers[challengers.length] = msg.author.id;
                    challenge[challenge.length] = son.id;
                    msg.channel.send(son.displayName + ", you have been challenged to a ranked duel by " + msg.author.username + "!");
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
            msg.reply("You cannot use that command here!");
        }
    }
}