module.exports = {
    name: 'raffleinfo',
    description: "Lets users view the current raffle!",
    execute(msg, con){
        con.query(`SELECT * FROM currentraffle`, (err, rows) => {
            if (err) throw err;

            if(rows.length > 0){
                let item = rows[0].raffle;
                let tim = parseInt(getTime(rows[0].time)) - (Date.now() - parseInt(rows[0].start));;
                let price = rows[0].price;
                let numwin = rows[0].numwin;
                con.query(`SELECT * FROM raffle`, (err, rows) => {
                    if (err) throw err;

                    let people = rows.length;

                    msg.reply('The current raffle is for ' + item + ' with ' + people + ' people in the raffle! The buy in price for the raffle is ' + price + '! The number of winners for this raffle is ' + numwin + '! There is ' + timeLeft(tim) + ' remaining in to join the raffle!');
                })
            } else {
                msg.reply("There is not a raffle going on at this time!");
            }

        })
    }
}

function getTime(t){
    let time = '';
    if(t.includes('s')){
        time = parseInt(t) * 1000;
    }

    if(t.includes('m')){
        time = parseInt(t) * 60000;
    }

    if(t.includes('h')){
        time = parseInt(t) * 3.6e+6;
    }

    return time;
}
function timeLeft(ms) {
    var sec = ms / 1000;

    var day = parseInt(sec / 86400);
    sec = sec % 86400;

    var hours = parseInt(sec / 3600);
    sec = sec % 3600;

    var min = parseInt(sec / 60);
    sec = parseInt(sec % 60);
    return (day + " days:" + hours + " hours:" + min + " minutes:" + sec + " seconds");
}