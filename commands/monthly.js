const month = 2.628e+9;
module.exports = {
    name: 'monthly',
    description: "Monthly points command for patreon peeps!",
    execute(msg, con, bronze, silver, boost, gold, pack, Discord){
        con.query(`SELECT * FROM months WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            let tim = 0;
            if(rows.length > 0){
                tim = month - (Date.now() - parseInt(rows[0].months));
            }
            
            let dut = parseInt(Date.now());

            if (tim <= 0) {
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let com = getRandomCards(pack.get("monthlypack").common, 3);
                let uncom = getRandomCards(pack.get("monthlypack").uncommon, 3);
                let rare1 = getRandomCards(pack.get("monthlypack").rare, 1);
                let rore = Math.floor(Math.random() * 15);

                let strc = '';
                let struc = '';
                let strr = '';
                let stre = '';
                let strs = '';
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
                    let card = com[i];
                    strc += card + "\n";
                    numC++;
                }
                for (let i = 0; i < uncom.length; i++) {
                    if(newCard.includes(uncom[i])){
                        let curIndex = newCard.indexOf(uncom[i]);
                        if(newRarity[curIndex] === "Uncommon"){
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
                    let card = uncom[i];
                    struc += card + "\n";
                    numC++;
                }
                for (let i = 0; i < rare1.length; i++) {
                    if(newCard.includes(rare1[i])){
                        let curIndex = newCard.indexOf(rare1[i]);
                        if(newRarity[curIndex] === "Rare"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = rare1[i];
                            newRarity[newIndex] = "Rare";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = rare1[i];
                        newRarity[newIndex] = "Rare";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    let card = rare1[i];
                    strr += card + "\n";
                    numC++;
                }
                if(rore < 14){
                    let rare = getRandomCards(pack.get("monthlypack").rare, pack.get("monthlypack").rarenum);
                    for (let i = 0; i < rare.length; i++) {
                        if(newCard.includes(rare[i])){
                            let curIndex = newCard.indexOf(rare[i]);
                            if(newRarity[curIndex] === "Rare"){
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
                        let card = rare[i];
                        strr += card + "\n";
                        numC++;
                    }
                    let epic = getRandomCards(pack.get("monthlypack").epic, 1);
                    for (let i = 0; i < epic.length; i++) {
                        if(newCard.includes(epic[i])){
                            let curIndex = newCard.indexOf(epic[i]);
                            if(newRarity[curIndex] === "Ultra"){
                                numNew[curIndex] += 1;
                            } else {
                                newCard[newIndex] = epic[i];
                                newRarity[newIndex] = "Ultra";
                                numNew[newIndex] = 1;
                                newIndex++;
                            }
                        } else {
                            newCard[newIndex] = epic[i];
                            newRarity[newIndex] = "Ultra";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                        let card = epic[i];
                        stre += card + "\n";
                        numC++;
                    }
                    const embed = new Discord.MessageEmbed()
                        .setColor('AQUA')
                        .setTitle('Monthly Cards Pulled by ' + msg.member.displayName)
                        .addField("Common",strc)
                        .addField("Uncommon",struc)
                        .addField("Rare",strr)
                        .addField("Ultra",stre);
                    msg.channel.send(embed);
                } else {
                    let secret = getRandomCards(pack.get("monthlypack").secret, 1);
                    for (let i = 0; i < secret.length; i++) {
                        if(newCard.includes(secret[i])){
                            let curIndex = newCard.indexOf(secret[i]);
                            if(newRarity[curIndex] === "Secret"){
                                numNew[curIndex] += 1;
                            } else {
                                newCard[newIndex] = secret[i];
                                newRarity[newIndex] = "Secret";
                                numNew[newIndex] = 1;
                                newIndex++;
                            }
                        } else {
                            newCard[newIndex] = secret[i];
                            newRarity[newIndex] = "Secret";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                        let card = secret[i];
                        stre += card + "\n";
                        numC++;
                    }
                    const embed = new Discord.MessageEmbed()
                        .setColor('AQUA')
                        .setTitle('Daily Cards Pulled by ' + msg.member.displayName)
                        .addField("Common",strc)
                        .addField("Uncommon",struc)
                        .addField("Rare",strr)
                        .addField("SECRET",strs);
                    msg.channel.send(embed);
                }
                sql = `UPDATE months SET months = ${dut} WHERE id = '${msg.author.id}'`;
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
                con.query(`SELECT * FROM stats WHERE id = '${msg.author.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;
                    if(rows.length > 0){
                        let totalCards = rows[0].numcards + numC;
                        sql = `UPDATE stats SET numcards = ${totalCards} WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                    }
                })
                if(msg.member.roles.cache.has(bronze.id)){
                    sql = `UPDATE months SET months = ${dut} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 1000);

                        sql = `UPDATE points SET points = '${pointers}' WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 1000 monthly Kaiba Tokens!');
                    })
                }
                if(msg.member.roles.cache.has(silver.id) || msg.member.roles.cache.has(boost.id)){
                    sql = `UPDATE months SET months = ${dut} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 3000);

                        sql = `UPDATE points SET points = '${pointers}' WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 3000 monthly Kaiba Tokens!');
                    })
                }
                if(msg.member.roles.cache.has(gold.id)){
                    sql = `UPDATE months SET months = ${dut} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 5000);

                        sql = `UPDATE points SET points = '${pointers}' WHERE id = '${msg.author.id}'`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 5000 monthly Kaiba Tokens!');
                    })
                }
            } else {
                msg.reply('You have already claimed your monthly reward for this month!');
            }

        })  
    }
}

function timeLeft(ms) {
    var sec = ms / 1000;

    var day = parseInt(sec / 86400);
    sec = sec % 86400;

    var hours = parseInt(sec / 3600);
    sec = sec % 3600;

    var min = parseInt(sec / 60);
    sec = parseInt(sec % 60);
    return (day + " days:" + hours + " hours:" + min + " minutes:" + sec + " seconds!");
}
function getRandomCards(cardList, number){
    let contains = [];
    for(var i = 0; i < number; i++){
        let num = Math.floor(Math.random() * cardList.length);
        contains[i] = cardList[num];
    }
    return contains;
}