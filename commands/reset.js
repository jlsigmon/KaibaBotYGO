module.exports = {
    name: 'reset',
    description: "Admin command to give points to a user",
    execute(msg, args, con, role, duelist){
        if (msg.member.roles.has(role.id)) {
            if (args[1]) {
                var person = msg.mentions.members.first();
                con.query(`SELECT * FROM points WHERE id = '${person.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        sql = `UPDATE points SET points = ${2000} WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from cards WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from wins WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from advance WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from rank WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from days WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from weeks WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                        sql = `DELETE from months WHERE id = '${person.id}'`;
                        con.query(sql, console.log);
                    }
                    msg.channel.sendMessage(person.displayName + ' has been reset!');

                })
                person.removeRole(duelist.id);
            } else {
                msg.reply('Please provide a valid user');
            }
        } else {
            msg.reply('You do not have permission to use this command!');
        }
    }
}