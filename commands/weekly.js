const week = 604800000;
module.exports = {
    name: 'weekly',
    description: "weekly",
    execute(msg, args, con){
        con.query(`SELECT * FROM weeks WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            let tim = 0;

            if(rows.length > 0){
                tim = week - (Date.now() - parseInt(rows[0].weeks));
            }

            let dut = parseInt(Date.now());

            if (tim <= 0) {
                sql = `UPDATE weeks SET weeks = ${dut} WHERE id = '${msg.author.id}'`;
                con.query(sql, console.log);
                con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    let pointer = parseInt(rows[0].points + 1000);
                    
                    sql = `UPDATE points SET points = '${pointer}' WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    
                    msg.reply('You have claimed you 1000 weekly Kaiba Tokens!');
                })
            } else {
                msg.reply('You have already claimed your weekly reward for this week!');
            }
        })
    }
}

function timeLeft(ms) {
    var sec = ms / 1000;

    var day = parseInt(sec / 86400);
    sec = sec % 86400;

    var hours = parseInt(sec / 3600);
    sec = sec % 3600;

    var min = parseInt(sec / 60);
    sec = parseInt(sec % 60);
    return (day + " days, " + hours + " hours, " + min + " minutes, and " + sec + " seconds");
}