let decks = ["dark","earth","wind","water","light","swordmasters","ancientarmy","heroforce","rockpower"];
module.exports = {
    name: 'buydeck',
    description: "Command to buy a deck",
    execute(msg, args, con, role, deck, Discord){
        if (args[1] === undefined) {
            msg.reply('Please provide a deck to buy!');
        } else if (!decks.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid deck!');
        } else  {
            let totalAdd = 0;
            var newCard = [];
            var numNew = [];
            var newRarity = [];
            var newIndex = 0;
            var numC = 0;
            let com = deck.get(args[1].toLowerCase()).common;
            let uncom = deck.get(args[1].toLowerCase()).uncommon;
            let rare = deck.get(args[1].toLowerCase()).rare;
            let ultra = deck.get(args[1].toLowerCase()).ultra;

            for (let i = 0; i < com.length; i++) {
                if(newCard.includes(com[i])){
                    let curIndex = newCard.indexOf(com[i]);
                    if(newRarity[curIndex] === "Common"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = com[i];
                        newRarity[newIndex] = "Common";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = com[i];
                    newRarity[newIndex] = "Common";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
            }
            for (let i = 0; i < uncom.length; i++) {
                if(newCard.includes(uncom[i])){
                    let curIndex = newCard.indexOf(uncom[i]);
                    if(newRarity[curIndex] = "Uncommon"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = uncom[i];
                        newRarity[newIndex] = "Uncommon";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = uncom[i];
                    newRarity[newIndex] = "Uncommon";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
            }
            for (let i = 0; i < rare.length; i++) {
                if(newCard.includes(rare[i])){
                    let curIndex = newCard.indexOf(rare[i]);
                    if(newRarity[curIndex] = "Rare"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = rare[i];
                        newRarity[newIndex] = "Rare";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = rare[i];
                    newRarity[newIndex] = "Rare";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
            }
            for (let i = 0; i < ultra.length; i++) {
                if(newCard.includes(ultra[i])){
                    let curIndex = newCard.indexOf(ultra[i]);
                    if(newRarity[curIndex] = "Ultra"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = ultra[i];
                        newRarity[newIndex] = "Ultra";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = ultra[i];
                    newRarity[newIndex] = "Ultra";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
            }
            con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                if (err) throw err;

                let sql;

                if (rows.length > 0) {
                    if (rows[0].points >= deck.get(args[1].toLowerCase()).price) {
                        let point = parseInt(rows[0].points);
                        let pts = parseInt(deck.get(args[1].toLowerCase()).price);
                        sql = `UPDATE points SET points = ${point - pts} WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
 
                        for (let i = 0; i < newCard.length; i++) {
                            con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND cardName = ? AND cardRarity = "${newRarity[i]}"`, [newCard[i]], (err, rows) => {
                                if (err) throw err;

                                var sql;
                                    
                                if (rows.length > 0) {
                                    var total = rows[0].cardNum;
                                    totalAdd = numNew[i];
                                    sql = `UPDATE collection SET cardNum = ${total + totalAdd} where userId = "${msg.author.id}" AND cardName = ? AND cardRarity = "${newRarity[i]}"`;
                                    con.query(sql, [newCard[i]],console.log);
                                } else {
                                    let sql2;
                                    totalAdd = numNew[i];
                                    sql2 = `INSERT INTO collection (userId, cardName, cardRarity, cardNum) VALUES ('${msg.author.id}', ?, "${newRarity[i]}", ${totalAdd})`;
                                    con.query(sql2, [newCard[i]],console.log);
                                }
                            })
                        }
                           
                        if (!msg.member.roles.cache.has(role.id)) {
                            msg.member.roles.add(role.id);
                        }
                        
                        const embed = new Discord.MessageEmbed()
                            .setColor('AQUA')
                            .setTitle('Successfully purchased the ' + args[1] + ' deck!')
                        msg.channel.send(embed);
                            
                        con.query(`SELECT * FROM stats WHERE id = '${msg.author.id}'`, (err, rows) => {
                            if (err) throw err;

                            let sql;
                            if(rows.length > 0){
                                let numPack = rows[0].numpacks + 1;
                                sql = `UPDATE stats SET numpacks = ${numPack} WHERE id = '${msg.author.id}'`;
                                con.query(sql, console.log);
                                let totalCards = rows[0].numcards + numC;
                                sql = `UPDATE stats SET numcards = ${totalCards} WHERE id = '${msg.author.id}'`;
                                con.query(sql, console.log);
                            }
                        })
                        //msg.reply('You have pulled ' + str);
                        
                    }
                    else {
                        msg.reply('You dont have enough points!');
                    }
                }
            })
       }
    }
}