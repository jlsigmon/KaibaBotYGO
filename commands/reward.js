const month = 2.628e+9;
module.exports = {
    name: 'reward',
    description: "Ranked reward command!",
    execute(msg, args, con, three, four, five){
        con.query(`SELECT * FROM reward WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            let tim = month - (Date.now() - parseInt(rows[0].time));
            
            let dut = parseInt(Date.now());

            if (tim <= 0) {
                if(msg.member.roles.has(three.id)){
                    sql = `UPDATE reward SET time = ${dut} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 3000);

                        sql = `UPDATE points SET points = '${pointers}' WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 3000 Kaiba Tokens for achieving Uria Red during the alpha period!');
                    })
                }
                if(msg.member.roles.has(four.id)){
                    sql = `UPDATE reward SET time = ${dut} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 2000);

                        sql = `UPDATE points SET points = '${pointers}' WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 2000 Kaiba Tokens for achieving Hamon Yellow during the alpha period!');
                    })
                }
                if(msg.member.roles.has(five.id)){
                    sql = `UPDATE reward SET time = ${dut} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 1000);

                        sql = `UPDATE points SET points = '${pointers}' WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 1000 Kaiba Tokens for achieving Raviel Blue during the alpha period!');
                    })
                }
            } else {
                msg.reply('You have already claimed your rank reward for this season!');
            }

        })  
    }
}

