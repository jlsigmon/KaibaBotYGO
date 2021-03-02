module.exports = {
    name: 'giveticket',
    description: "Admin command to give users tickets",
    execute(msg, args, con, role){
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.roles.cache.has(role.id)) {
            if (args[1]) {
                var person = msg.mentions.users.first();
                if (args[2] && args[2] > 0) {
                    con.query(`SELECT * FROM ticket WHERE id = '${person.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        if (rows.length > 0) {
                            let point = parseInt(rows[0].ticket);
                            let pts = parseInt(args[2]);
                            sql = `UPDATE ticket SET ticket = ${point + pts} WHERE id = '${person.id}'`;
                            con.query(sql, console.log);
                        }
                        if (rows.length < 1) {
                            let tick = parseInt(args[2]);
                            sql = `INSERT INTO ticket (id, ticket) VALUES ('${member.id}', '${tick}')`
                            con.query(sql, console.log);
                        }
                        msg.channel.send(person.username + ' has been awarded ' + args[2] + " Event Tickets!");

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