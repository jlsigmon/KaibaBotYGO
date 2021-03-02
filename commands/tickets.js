module.exports = {
    name: 'tickets',
    description: "command to view number of tickets you have",
    execute(msg, args, con){
        con.query(`SELECT * FROM ticket WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                let tickets = rows[0].ticket;
                msg.reply('You have ' + tickets + ' Event Tickets.');
            }
        })
    }
}