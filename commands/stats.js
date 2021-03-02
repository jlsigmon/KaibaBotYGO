module.exports = {
    name: 'stats',
    description: "Gives users info on different commands",
    execute(msg, Discord, con){
        con.query(`SELECT * FROM stats WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;
            if(rows.length > 0){
                let numPack = rows[0].numpacks;
                let totalCards = rows[0].numcards;
                let totalDuels = rows[0].numduels;
                const embed = new Discord.MessageEmbed()
                    .setTitle(msg.member.displayName + "'s Stats")
                    .addField('Total Packs Opened', numPack)
                    .addField('Total Cards Pulled', totalCards)
                    .addField('Totals Duels Completed', totalDuels);
                msg.channel.send(embed);
            }
        })
        
        
    }
}