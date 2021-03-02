const packs = ["pduel","sinfinity","ejustice","cyimpact","lostm","cyrev","elenergy","rdestiny","feternity","soulduel","asanctuary","ichaos","legendblue", "metalraider", "magicruler","pservant","labnight","ldarkness","pguardian","dcrisis","magicforce"];
const custom = ["custom6","custom4","custom5","custom1","allcards","demonstuff","newbeginnings","custom3","db1","destinedroads"];
const tourney = ["tourney1"];
module.exports = {
    name: 'buypack',
    description: "Command for users to buy a pack",
    execute(msg, args, con, pack, Discord){
        let numToPull = 1;
        let k = msg.author.id;
        if (args[1] === undefined) {
            msg.reply('Please provide a pack!');
        } else if (!packs.includes(args[1].toLowerCase()) && !custom.includes(args[1].toLowerCase()) && !tourney.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid pack!');
        } else {
            if(args[2] !== undefined){
                numToPull = parseInt(args[2]);
            }
            if(tourney.includes(args[1].toLowerCase()) && !custom.includes(args[1].toLowerCase()) && !packs.includes(args[1].toLowerCase())){
                let pagesE = [];
                let page = 0;
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                for(let p = 0; p < numToPull; p++){
                    let epic = getRandomCards(pack.get(args[1].toLowerCase()).epic, pack.get(args[1].toLowerCase()).epicnum);
                    let stre = '';
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
                    pagesE[pagesE.length] = stre;
                }
                
                con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                    if (err) throw err;
    
                    let sql;
    
                    if (rows.length > 0) {
                        if (rows[0].points >= pack.get(args[1].toLowerCase()).price * numToPull) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(pack.get(args[1].toLowerCase()).price * numToPull);
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

                            
                            const embed = new Discord.MessageEmbed()
                                .setColor('AQUA')
                                .setTitle('Cards Pulled by ' + msg.member.displayName)
                                .addField("Ultra",pagesE[page])
                                .setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                            msg.channel.send(embed).then(msg =>{
                                msg.react('◀').then(async r => {
                                    msg.react('▶')
                
                                    const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                
                                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                    
                                    back.on('collect',async r => {
                                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                        try {
                                            for (const reaction of userReactions.values()) {
                                                await reaction.users.remove(k);
                                            }
                                        } catch (error) {
                                            console.error('Failed to remove reactions.');
                                        }
                                        embed.spliceFields(0, 1);
                                        if (page === 0) return;
                                        page--;
                                        embed.addField("Ultra",pagesE[page])
                                        embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                        msg.edit(embed);
                
                                    })
                                    ford.on('collect',async r => {
                                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                        try {
                                            for (const reaction of userReactions.values()) {
                                                await reaction.users.remove(k);
                                            }
                                        } catch (error) {
                                            console.error('Failed to remove reactions.');
                                        }
                                        embed.spliceFields(0, 1);
                                        if (page === numToPull - 1) return;
                                        page++;    
                                        embed.addField("Ultra",pagesE[page])
                                        embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                        msg.edit(embed);
                                        
                                    })
                                })    
                            });
                            
                        }
                        else {
                            msg.reply('You dont have enough tokens!');
                        }
                    }
                })
            }
            else if(!custom.includes(args[1].toLowerCase()) && !tourney.includes(args[1].toLowerCase())){
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let pagesC = [];
                let pagesUc = [];
                let pagesR = [];
                let pagesE = [];
                let page = 0;

                for(let p = 0; p < numToPull; p++){
                    let com = getRandomCards(pack.get(args[1].toLowerCase()).common, pack.get(args[1].toLowerCase()).commonnum);
                    let uncom = getRandomCards(pack.get(args[1].toLowerCase()).uncommon, pack.get(args[1].toLowerCase()).uncommonnum);
                    let rore = Math.floor(Math.random() * 6);
                    let strc = '';
                    let struc = '';
                    let strr = '';
                    let stre = '';
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
                    pagesC[p] = strc;
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
                    pagesUc[p] = struc;
                    if(rore < 5){
                        let rare = getRandomCards(pack.get(args[1].toLowerCase()).rare, pack.get(args[1].toLowerCase()).rarenum);
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
                        pagesR[p] = strr;
                    } else {
                        let epic = getRandomCards(pack.get(args[1].toLowerCase()).epic, pack.get(args[1].toLowerCase()).epicnum);
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
                        pagesE[p] = stre;
                        
                    }
                }
                if(args[1].toLowerCase() == "oshfoiahfoiashoifahsofihaosfhasofih"){
                    /*
                    con.query(`SELECT * FROM ticket WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].ticket >= 1) {
                                let point = parseInt(rows[0].ticket);
                                let pts = 1;
                                sql = `UPDATE ticket SET ticket = ${point - pts} WHERE id = '${msg.author.id}'`;
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
                                        let numPack = rows[0].numpacks + 1;
                                        sql = `UPDATE stats SET numpacks = ${numPack} WHERE id = '${msg.author.id}'`;
                                        con.query(sql, console.log);
                                        let totalCards = rows[0].numcards + numC;
                                        sql = `UPDATE stats SET numcards = ${totalCards} WHERE id = '${msg.author.id}'`;
                                        con.query(sql, console.log);
                                    }
                                })

                                if(stre == ""){
                                    const embed = new Discord.MessageEmbed()
                                        .setColor('AQUA')
                                        .setTitle('Cards Pulled by ' + msg.member.displayName)
                                        .addField("Common",strc)
                                        .addField("Uncommon",struc)
                                        .addField("Rare",strr);
                                    msg.channel.send(embed);
                                } else {
                                    const embed = new Discord.MessageEmbed()
                                        .setColor('AQUA')
                                        .setTitle('Cards Pulled by ' + msg.member.displayName)
                                        .addField("Common",strc)
                                        .addField("Uncommon",struc)
                                        .addField("Ultra",stre);
                                    msg.channel.send(embed);
                                }
                            }
                            else {
                                msg.reply('You dont have enough tickets!');
                            }
                        }
                    })
                    */
                   msg.reply('Wow you guess the secret message!');
                } else {
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= pack.get(args[1].toLowerCase()).price * numToPull) {
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(pack.get(args[1].toLowerCase()).price * numToPull);
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

                                
                                const embed = new Discord.MessageEmbed()
                                    .setColor('AQUA')
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Uncommon",pagesUc[page]);
                                if(pagesE[page] == undefined){
                                    embed.addField("Rare",pagesR[page]);
                                } else {
                                    embed.addField("Ultra",pagesE[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === 0) return;
                                            page--;
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            if(pagesE[page] == undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } else {
                                                embed.addField("Ultra",pagesE[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === numToPull - 1) return;
                                            page++;    
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            if(pagesE[page] == undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } else {
                                                embed.addField("Ultra",pagesE[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                                            
                                        })
                                    })    
                                });
                                
                            }
                            else {
                                msg.reply('You dont have enough tokens!');
                            }
                        }
                    })
                }
            } else {
                if(args[1].toLowerCase() == "db1"){
                    let totalAdd = 0;
                    var newCard = [];
                    var numNew = [];
                    var newRarity = [];
                    var newIndex = 0;
                    var numC = 0;
                    let pagesC = [];
                        
                    let pagesR = [];
                        
                    let page = 0;

                    for(let p = 0; p < numToPull; p++){
                        let com = getRandomCards(pack.get("db1").common, 7);
                        let rare1 = getRandomCards(pack.get("db1").rare, 5);
                        

                        let strc = '';
                        
                        let strr = '';
                        
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
                        pagesC[p] = strc;
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
                        pagesR[p] = strr;
                    }
                    
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= 150 * numToPull) {
                                
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(150 * numToPull);
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
                                
                                
                                const embed = new Discord.MessageEmbed()
                                    .setColor('AQUA')
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Rare",pagesR[page]);
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === 0) return;
                                            page--;
                                            embed.addField("Common",pagesC[page])
                                            
                                            embed.addField("Rare",pagesR[page]);
                                            
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === numToPull - 1) return;
                                            page++;    
                                            embed.addField("Common",pagesC[page])
                                            
                                            embed.addField("Rare",pagesR[page]);
                                            
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                                            
                                        })
                                    })    
                                });
                                
                                
                            } else {
                                msg.reply('You dont have enough tokens!');
                            }
                        }
                    })
                } else if(args[1].toLowerCase() == "allcards"){
                        let totalAdd = 0;
                        var newCard = [];
                        var numNew = [];
                        var newRarity = [];
                        var newIndex = 0;
                        var numC = 0;
                        let pagesC = [];
                        let pagesUc = [];
                        let pagesR = [];
                        let pagesE = [];
                        let pagesS = [];
                        let page = 0;

                        for(let p = 0; p < numToPull; p++){
                            let com = getRandomCards(pack.get("monthlypack").common, 3);
                            let uncom = getRandomCards(pack.get("monthlypack").uncommon, 3);
                            let rare1 = getRandomCards(pack.get("monthlypack").rare, 1);
                            let rore = Math.floor(Math.random() * 6);
        
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
                            pagesC[p] = strc;
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
                            pagesUc[p] = struc;
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
                            pagesR[p] = strr;
                            if(rore < 5){
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
                                pagesR[p] += strr;
                            } else {
                                let rors = Math.floor(Math.random() * 6);
                                if(rors < 5){
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
                                    pagesE[p] = stre;
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
                                        strs += card + "\n";
                                        numC++;
                                    }
                                    pagesS[p] = strs;
                                }
                            }
                        }
                        con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                            if (err) throw err;
            
                            let sql;
            
                            if (rows.length > 0) {
                                if (rows[0].points >= 150 * numToPull) {
                                    
                                    let point = parseInt(rows[0].points);
                                    let pts = parseInt(150 * numToPull);
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
                                    const embed = new Discord.MessageEmbed()
                                    .setColor('AQUA')
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Uncommon",pagesUc[page])
                                    .addField("Rare",pagesR[page]);
                                
                                if(pagesS[page] == undefined && pagesE[page] !== undefined){
                                    embed.addField("Ultra",pagesE[page]);
                                } else if(pagesS[page] !== undefined && pagesE[page] == undefined){
                                    embed.addField("SECRET",pagesS[page]);
                                }
                                
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 4);
                                            if (page === 0) return;
                                            page--;
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            embed.addField("Rare",pagesR[page]);
                                            
                                            if(pagesS[page] == undefined && pagesE[page] !== undefined){
                                                embed.addField("Ultra",pagesE[page]);
                                            } else if(pagesS[page] !== undefined && pagesE[page] == undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 4);
                                            if (page === numToPull - 1) return;
                                            page++;    
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            
                                            embed.addField("Rare",pagesR[page]);
                                            
                                            if(pagesS[page] == undefined && pagesE[page] !== undefined){
                                                embed.addField("Ultra",pagesE[page]);
                                            } else if(pagesS[page] !== undefined && pagesE[page] == undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                                            
                                        })
                                    })    
                                });
                                } else {
                                    msg.reply('You dont have enough tokens!');
                                }
                            }
                        })
                    } else if(args[1].toLowerCase() == "custom3"){
                        let totalAdd = 0;
                        var newCard = [];
                        var numNew = [];
                        var newRarity = [];
                        var newIndex = 0;
                        var numC = 0;
                        let pagesC = [];
                        let pagesUc = [];
                        let pagesR = [];
                        let pagesE = [];
                        let pagesS = [];
                        let page = 0;

                        for(let p = 0; p < numToPull; p++){
                            let com = getRandomCards(pack.get("custom3").common, 3);
                            let uncom = getRandomCards(pack.get("custom3").uncommon, 2);
                            let rare1 = getRandomCards(pack.get("custom3").rare, 1);
                            let rore = Math.floor(Math.random() * 6);
        
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
                            pagesC[p] = strc;
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
                            pagesUc[p] = struc;
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
                            pagesR[p] = strr;
                            if(rore < 5){
                                let rare = getRandomCards(pack.get("custom3").rare, pack.get("custom3").rarenum);
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
                                pagesR[p] += strr;
                            } else {
                                let rors = Math.floor(Math.random() * 6);
                                if(rors < 5){
                                    let epic = getRandomCards(pack.get("custom3").epic, 1);
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
                                    pagesE[p] = stre;
                                } else {
                                    let secret = getRandomCards(pack.get("custom3").secret, 1);
                                                    
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
                                        strs += card + "\n";
                                        numC++;
                                    }
                                    pagesS[p] = strs;
                                }
                            }
                        }
                        con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                            if (err) throw err;
            
                            let sql;
            
                            if (rows.length > 0) {
                                if (rows[0].points >= 150 * numToPull) {
                                    
                                    let point = parseInt(rows[0].points);
                                    let pts = parseInt(150 * numToPull);
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
                                    
                                const embed = new Discord.MessageEmbed()
                                    .setColor('AQUA')
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Uncommon",pagesUc[page])
                                    .addField("Rare",pagesR[page]);
                                
                                if(pagesS[page] == undefined && pagesE[page] !== undefined){
                                    embed.addField("Ultra",pagesE[page]);
                                } else if(pagesS[page] !== undefined && pagesE[page] == undefined){
                                    embed.addField("SECRET",pagesS[page]);
                                }
                                
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 4);
                                            if (page === 0) return;
                                            page--;
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            embed.addField("Rare",pagesR[page]);
                                            
                                            if(pagesS[page] == undefined && pagesE[page] !== undefined){
                                                embed.addField("Ultra",pagesE[page]);
                                            } else if(pagesS[page] !== undefined && pagesE[page] == undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 4);
                                            if (page === numToPull - 1) return;
                                            page++;    
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            
                                            embed.addField("Rare",pagesR[page]);
                                            
                                            if(pagesS[page] == undefined && pagesE[page] !== undefined){
                                                embed.addField("Ultra",pagesE[page]);
                                            } else if(pagesS[page] !== undefined && pagesE[page] == undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                                            
                                        })
                                    })    
                                });
                                } else {
                                    msg.reply('You dont have enough tokens!');
                                }
                            }
                        })
                } else {
                    let totalAdd = 0;
                    var newCard = [];
                    var numNew = [];
                    var newRarity = [];
                    var newIndex = 0;
                    var numC = 0;
                    let pagesC = [];
                    let pagesUc = [];
                    let pagesR = [];
                    let pagesE = [];
                    let page = 0;

                    for(let p = 0; p < numToPull; p++){
                        let com = getRandomCards(pack.get(args[1].toLowerCase()).common, pack.get(args[1].toLowerCase()).commonnum);
                        let uncom = getRandomCards(pack.get(args[1].toLowerCase()).uncommon, pack.get(args[1].toLowerCase()).uncommonnum);
                        let rore = Math.floor(Math.random() * 6);

                        let strc = '';
                        let struc = '';
                        let strr = '';
                        let stre = '';
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
                        pagesC[p] = strc;
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
                        pagesUc[p] = struc;
                        if(rore < 5){
                            let rare = getRandomCards(pack.get(args[1].toLowerCase()).rare, pack.get(args[1].toLowerCase()).rarenum + 1);
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
                            pagesR[p] = strr;
                        } else {
                            let epic = getRandomCards(pack.get(args[1].toLowerCase()).epic, pack.get(args[1].toLowerCase()).epicnum);
                            let rare = getRandomCards(pack.get(args[1].toLowerCase()).rare, pack.get(args[1].toLowerCase()).rarenum);
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
                            pagesR[p] = strr;
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
                            pagesE[p] = stre;
                            
                        }
                    }
                    con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= pack.get(args[1].toLowerCase()).price * numToPull) {
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(pack.get(args[1].toLowerCase()).price * numToPull);
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
                                const embed = new Discord.MessageEmbed()
                                    .setColor('AQUA')
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Uncommon",pagesUc[page]);
                                if(pagesE[page] == undefined){
                                    embed.addField("Rare",pagesR[page]);
                                } else {
                                    embed.addField("Rare",pagesR[page]);
                                    embed.addField("Ultra",pagesE[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === 0) return;
                                            page--;
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            if(pagesE[page] == undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } else {
                                                embed.addField("Rare",pagesR[page]);
                                                embed.addField("Ultra",pagesE[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === numToPull - 1) return;
                                            page++;    
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Uncommon",pagesUc[page]);
                                            if(pagesE[page] == undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } else {
                                                embed.addField("Rare",pagesR[page]);
                                                embed.addField("Ultra",pagesE[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                            msg.edit(embed);
                                            
                                        })
                                    })    
                                });
                            }
                            else {
                                msg.reply('You dont have enough tokens!');
                            }
                        }
                    })
                }
            }
        }
    }
}

function getRandomCards(cardList, number){
    let contains = [];
    for(let i = 0; i < number; i++){
        let num = Math.floor(Math.random() * cardList.length);
        contains[i] = cardList[num];
    }
    return contains;
}