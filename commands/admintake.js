module.exports = {
    name: 'admintake',
    description: "Admin command to take points from a user",
    execute(msg, args, con, role){
        if (msg.member.roles.has(role.id)) {
            var person = msg.mentions.users.first();
            if (args[1] && person !== undefined) {
                
                if (args[2] && args[2] > 0) {
                    con.query(`SELECT * FROM points WHERE id = '${person.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        if (rows.length > 0 && rows[0].points > parseInt(args[2])) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(args[2]);
                            sql = `UPDATE points SET points = ${point - pts} WHERE id = '${person.id}'`;

                            con.query(sql, console.log);
                        }
                        msg.channel.sendMessage(person.username + ' has had ' + args[2] + " Kaiba Tokens taken away!");

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