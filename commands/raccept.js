module.exports = {
    name: 'raccept',
    description: "Lets users accept ranked duel challenges!",
    execute(msg, walnut, challenge, rankedban){
        if(!msg.member.roles.cache.has(rankedban.id)){
            if (challenge.includes(msg.author.id)) {
                var n = challenge.indexOf(msg.author.id);
                msg.channel.send('<@' + walnut[n].id + '>, Your ranked challenge has been accepted!');

            } else {
                msg.reply('You do not have a pending challenge!');
            }
        } else {
            msg.reply("You have a ban from ranked duels!");
        }
    }
}