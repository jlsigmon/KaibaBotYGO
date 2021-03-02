module.exports = {
    name: 'rank',
    description: "Lets users see the top ten users by ranked win rate!",
    execute(msg, con){
        con.query(`SELECT * FROM ranked ORDER BY level DESC, ratio DESC, wins DESC`, (err, rows) => {
            if (err) throw err;
            
            for(let p = 0; p < rows.length; p++){
                if(rows[p].id === msg.author.id){
                    msg.reply(" You are number " + (p+1) + " on the global ranked leaderboard with " + rows[p].level + " points, " + rows[p].wins + " wins, " + rows[p].lose + " loses, and a win rate of " + rows[p].ratio + "!");
                    break;
                }
            }
            
        })   
    }
}