module.exports = {
    name: 'rafflejoin',
    description: "Lets users join a raffle!",
    execute(msg, con, role){
        if(!msg.member.roles.cache.has(role.id)){
            con.query(`SELECT * FROM currentraffle`, (err, rows) => {
                if (err) throw err;
        
                let sql;
        
                //if id not found, adds them to the table
                if (rows.length > 0) {
                    let price = rows[0].price;
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql2;

                        if (rows.length > 0) {
                            if (rows[0].points >= price) {
                                let point = parseInt(rows[0].points) - price;
                                sql2 = `UPDATE points SET points = ${point} WHERE id = '${msg.author.id}'`;
                                con.query(sql2, console.log);
                                con.query(`SELECT * FROM raffle WHERE id = '${msg.author.id}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql3;

                                    if(rows.length < 1){
                                        sql3 = `INSERT INTO raffle (user, id) VALUES ("${msg.member.displayName}", '${msg.member.id}')`
                                        con.query(sql3, console.log);
                                        msg.reply("You have successfully joined the raffle!");
                                    } else{
                                        msg.reply("You have already joined the raffle!");
                                    }
                                })
                            } else{
                                msg.reply("You do not have enough points to join the raffle!");
                            }
                        }
                    })
                }  else {
                    msg.reply("There is not a raffle going on at this time!");
                }    
            })
        } else {
            msg.reply("You do not have permission to join this raffle!");
        }
    }
}