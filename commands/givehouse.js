module.exports = {
    name: 'givehouse',
    description: "Command for users to give other users points",
    execute(msg, args, con, avatar, dreadroot, eraser, role){
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.roles.cache.has(role.id)) {
            var person = msg.mentions.members.first();
            let house = '';
            if(person.roles.cache.has(avatar.id)){
                house = 'avatar';
            }
            if(person.roles.cache.has(dreadroot.id)){
                house = 'dreadroot';
            }
            if(person.roles.cache.has(eraser.id)){
                house = 'eraser';
            }
            if(house === ''){
                msg.reply('that user is not in a house!');
                return;
            }
            if (args[1] && person !== undefined) {
                if (args[2] && args[2] > 0) {
                    let amount = parseInt(args[2]);
                    con.query(`SELECT * FROM house WHERE userID = '${person.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        if (rows.length > 0) {
                            let point = parseInt(rows[0].points + amount);
                            sql = `UPDATE house SET points = ${point} WHERE userID = '${person.id}'`;
                            con.query(sql, console.log);
                        } else {
                            sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${person.id}', '${house}', ${amount}, '${msg.author.username}')`;
                            con.query(sql, console.log);
                        }
                            
                        msg.channel.send(house + ' has been awarded ' + amount + ' points!');
                    })
                } else {
                    msg.reply('Please provide a number greater than 0');
                }
            } else {
                msg.reply('Please provide a valid user');
            }
        }
    }
}