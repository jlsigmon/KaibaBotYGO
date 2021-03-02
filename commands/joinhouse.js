module.exports = {
    name: 'joinhouse',
    description: "Lets users join a house!",
    execute(msg, args, avatar, dreadroot, eraser){
        if(!msg.member.roles.cache.has(avatar.id) && !msg.member.roles.cache.has(dreadroot.id) && !msg.member.roles.cache.has(eraser.id)){
            if(args[1]){
                switch (args[1].toLowerCase()){
                    case 'avatar':
                        msg.member.roles.add(avatar.id);
                        msg.reply("You successfully joined The House of Avatar!");
                    break;
                    case 'dreadroot':
                        msg.member.roles.add(dreadroot.id);
                        msg.reply("You successfully joined The House of Dreadroot!");
                    break;
                    case 'eraser':
                        msg.member.roles.add(eraser.id);
                        msg.reply("You successfully joined The House of Eraser!");
                    break;
                    default:
                        msg.reply('You need to provide the name of the house you want to join! ex. k!joinhouse eraser');
                }
            } else {
                msg.reply('You need to provide the name of the house you want to join! ex. k!joinhouse eraser');
            }
        } else {
            msg.reply("You have already joined a house!");
        }
    }
}