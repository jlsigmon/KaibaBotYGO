module.exports = {
    name: 'rankban',
    description: "Lets admin rankban users to the shadow realm!",
    execute(msg, args, admin, shadow, ms){
            if (msg.member.roles.has(admin.id)) {
                if (args[1]) {
                    var person = msg.mentions.members.first();
                    if (args[2]) {
                        let time = args[2];

                        msg.channel.send(person.displayName + ' has been banned from ranked duels for ' + ms(ms(time)));

                        person.roles.add(shadow.id);
                        

                        setTimeout(function () {
                            person.roles.remove(shadow.id);
                            msg.channel.send(person + ' has been unbanned from ranked!');
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