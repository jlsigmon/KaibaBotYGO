const day = 86400000;
const secret = ["secret","Obelisk the Tormentor","Slifer the Sky Dragon","The Winged Dragon of Ra","Five Headed Dragon"];
module.exports = {
    name: 'daily',
    description: "Daily points command",
    execute(msg, con){
        con.query(`SELECT * FROM days WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            let tim = 0;

            if(rows.length > 0){
                tim = day - (Date.now() - parseInt(rows[0].days));
            }

            let dut = parseInt(Date.now());

            if (tim <= 0) {
                sql = `UPDATE days SET days = ${dut} WHERE id = '${msg.author.id}'`;
                con.query(sql, console.log);
                con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    let pointer = parseInt(rows[0].points + 500);
                    
                    sql = `UPDATE points SET points = '${pointer}' WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    
                    msg.reply('You have claimed you 500 daily Kaiba Tokens!');
                })
            } else {
                msg.reply('You have already claimed your daily reward for this day!');
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

function getRandomCards(cardList, number){
    let contains = [];
    for(var i = 0; i < number; i++){
        let num = Math.floor(Math.random() * cardList.length);
        contains[i] = cardList[num];
    }
    return contains;
}