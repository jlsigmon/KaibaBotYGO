module.exports = {
    name: 'cwl',
    description: "Lets users see their wl",
    execute(msg, args, con){
        con.query(`SELECT * FROM wins WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let win = parseInt(rows[0].wins);
            let lose = parseInt(rows[0].lose);
            let ratio = parseFloat(win / lose);
            if (lose === 0) {
                ratio = win;
            }
            msg.reply('You have won ' + win + ' duels and lost ' + lose + ' duels with a win rate of ' + ratio);
        })
    }
}