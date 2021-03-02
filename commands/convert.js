module.exports = {
    name: 'convert',
    description: "Lets users convert extra cards into points!",
    execute(msg, args, con){
        let rarity = "none";
        if(args.length > 1){
            rarity = args[args.length - 1].toLowerCase();
        }
        var cards = [];
        var burned = 0;
        let total = 0;
        con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' ORDER BY cardName`, (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                
                for(let x = 0; x < rows.length; x++){
                    if(rows[x].cardNum > 3){
                        if(rarity === "none" || rarity === "common"){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (5 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rarity === "none" || rarity === "uncommon"){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (10 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rarity === "none" || rarity === "rare"){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (25 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rarity === "none" || rarity === "ultra"){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (50 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rarity === "none" || rarity === "secret"){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (1000 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        } 
                    }
                }
                msg.reply('You have made ' + total + ' Kaiba Tokens from converting ' + burned + ' extra cards!');
                con.query(`SELECT * FROM points WHERE id = "${msg.author.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    //if message sender doesn't have a place in the database
                    //creates row in points giving them the "defaultPoints" value in the config
                    //Otherwise they gain points equal to "points" in config  
                    let gain = parseInt(rows[0].points + total);
                    sql = `UPDATE points SET points = '${gain}' WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                })
            }  
            
            for(let i = 0; i < cards.length; i++){
                let sql2;
                sql2 = `UPDATE collection SET cardNum = 3 where userId = "${msg.author.id}" AND cardName = "${cards[i]}"`;
                con.query(sql2,console.log);
            }
        })    
        
    }
}