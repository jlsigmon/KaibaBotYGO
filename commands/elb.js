//rows[p].wins/rows[p].lose
module.exports = {
    name: 'elb',
    description: "Lets users see the top ten users by wins!",
    execute(msg, args, con, Discord){
        let k = msg.author.id;
        con.query(`SELECT * FROM event ORDER BY wins DESC`, (err, rows) => {
            if (err) throw err;

            let teams = ' ';

            for(let p = 0; p < rows.length; p++){
                if(p < rows.length){
                    teams += (p+1) + ". " + rows[p].team + ", Wins: " + rows[p].wins + "\n"; 
                }
            }
            const embed = new Discord.RichEmbed()
                .setColor('AQUA')
                .setTitle('Event Leaderboard')
                .setDescription(teams);
            msg.channel.send(embed)
        })   
    }
}