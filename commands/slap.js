module.exports = {
    name: 'slap',
    description: "Lets users slap another user!",
    execute(msg){
        let slap = msg.mentions.users.first();
        if(slap !== undefined){
            msg.channel.send(slap.username + " has been slapped!");
        } else {
            msg.reply("Please provide a user to slap");
        }   
    }
}