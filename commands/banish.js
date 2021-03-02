module.exports = {
    name: 'banish',
    description: "Lets admin banish users to the shadow realm!",
    execute(msg, args, admin, mod, helper, shadow, duelist, ms){
            if (msg.member.roles.cache.has(admin.id) || msg.member.roles.cache.has(mod.id) || msg.member.roles.cache.has(helper.id)) {
                var person = msg.mentions.members.first();
                if (args[1] && person !== undefined) {
                    
                    if (args[2]) {
                        let time = args[2];

                        msg.channel.send(person.displayName + ' has been banished to the shadow realm for ' + ms(ms(time)));

                        person.roles.remove(duelist.id);
                        person.roles.add(shadow.id);
                        
                        setTimeout(function () {
                            person.roles.add(duelist.id);
                            person.roles.remove(shadow.id);
                            msg.channel.send(person.displayName + ' has been released from the shadow realm! Be a good person now!');
                        }, ms(time));
                    }else{
                        msg.reply('please provide a time!');
                    }

                } else {
                    msg.reply('Please provide a valid user');
                }
            } else {
                msg.reply('You do not have permission to use this command!');
            }
    }
}