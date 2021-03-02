module.exports = {
    name: 'points',
    description: "Command to view the number of points you have",
    execute(msg, con){
        con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                let point = rows[0].points;
                msg.reply('You have ' + point + ' Kaiba Tokens.');
            }
        })
    }
}