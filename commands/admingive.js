module.exports = {
    name: 'admingive',
    description: "Admin command to give points to a user",
    execute(msg, args, con, role){
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.roles.cache.has(role.id)) {
            var person = msg.mentions.users.first();
            if (args[1] && person !== undefined) {
                if (args[2] && args[2] > 0) {
                    con.query(`SELECT * FROM points WHERE id = '${person.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        if (rows.length > 0) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(args[2]);
                            sql = `UPDATE points SET points = ${point + pts} WHERE id = '${person.id}'`;

                            con.query(sql, console.log);
                        }
                        msg.channel.send(person.username + ' has been awarded ' + args[2] + " Kaiba Tokens!");

                    })
                } else {
                    msg.reply('Please provide a number greater than 0');
                }
            } else {
                msg.reply('Please provide a valid user');
            }
        } else {
            msg.reply('You do not have permission to use this command!');
        }
    }
}