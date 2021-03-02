module.exports = {
    name: 'giverole',
    description: "Command for users to give other users points",
    execute(msg, args, con, admin){
        if(msg.member.roles.cache.has(admin.id)){
            var person = msg.mentions.roles.first();
            if (args[1] && person !== undefined) {
                
                var role = person.members.array();
                if (args[2] && args[2] > 0) {
                    
                    for(let i = 0; i < role.length; i++){
                        
                        con.query(`SELECT * FROM points WHERE id = '${role[i].id}'`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let point = parseInt(rows[0].points);
                                let pts2 = parseInt(args[2]);
                                sql = `UPDATE points SET points = ${point + pts2} WHERE id = '${role[i].id}'`;
                                con.query(sql, console.log);
                            }
                        })
                    }
                    
                    msg.channel.send("The <@&" + person.id + "> role has been given " + args[2] + " Kaiba Tokens!");
                } else {
                    msg.reply('Please provide a number greater than 0');
                }
            } else {
                msg.reply('Please provide a valid role');
            }
        } else {
            msg.reply('You do not have permission to use this command!')
        }
    }
}