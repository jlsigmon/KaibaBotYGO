module.exports = {
    name: 'awl',
    description: "Lets users see their wl",
    execute(msg, con){
        if(msg.channel.name === 'server-duels' || msg.channel.name === 'custom-format' || msg.channel.name === 'wild-format'){
            con.query(`SELECT * FROM advance WHERE id = '${msg.author.id}'`, (err, rows) => {
                if (err) throw err;

                let win = parseInt(rows[0].wins);
                let lose = parseInt(rows[0].lose);
                let ratio = parseFloat(win / (lose + win));
                if (lose === 0) {
                    ratio = win;
                }
                msg.reply('You have won ' + win + ' duels and lost ' + lose + ' duels with a win rate of ' + ratio);
            })
        } else if (msg.channel.name === 'modern-format'){
            con.query(`SELECT * FROM modern WHERE id = '${msg.author.id}'`, (err, rows) => {
                if (err) throw err;

                let win = parseInt(rows[0].wins);
                let lose = parseInt(rows[0].lose);
                let ratio = parseFloat(win / (lose + win));
                if (lose === 0) {
                    ratio = win;
                }
                msg.reply('You have won ' + win + ' duels and lost ' + lose + ' duels with a win rate of ' + ratio);
            })
        }
    }
}