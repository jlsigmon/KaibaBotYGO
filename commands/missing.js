const packs = ["custom6","custom5","custom4","demonstuff","custom1","newbeginnings","destinedroads","pduel","sinfinity","ejustice","cyimpact","lostm","cyrev","elenergy","rdestiny","feternity","soulduel","asanctuary","ichaos","legendblue", "metalraider", "magicruler","pservant","labnight","ldarkness","pguardian","dcrisis","magicforce"];
const custom = ["custom3","db1","tourney1"];
module.exports = {
    name: 'missing',
    description: "Lets users see what cards they have",
    execute(msg, args, con, Discord, pack){
        let k = msg.author.id;
        if (args[1] === undefined) {
            msg.reply('Please provide a pack!');
        } else if (!packs.includes(args[1].toLowerCase()) && !custom.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid pack!');
        }
        const embed = new Discord.MessageEmbed().setTitle(msg.member.displayName + "'s Missing Collection");
        if(args[1] != undefined){
            if(packs.includes(args[1].toLowerCase())){
                //create comparison arrays
                let comList = pack.get(args[1].toLowerCase()).common;
                let uncomList = pack.get(args[1].toLowerCase()).uncommon;
                let rareList = pack.get(args[1].toLowerCase()).rare;
                let ultraList = pack.get(args[1].toLowerCase()).epic;
                let commons = [];
                let uncommons = [];
                let rares = [];
                let ultras = [];
                //query the database
                con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' ORDER BY cardName`, (err, rows) => {
                    if (err) throw err;
                    //vars related to the embed pages
                    let sql;
                    let count = 0;
                    let curPage = 0;
                    let pages = [];
                    let page = 1;
                    let per = 25;
                    let card = [];
                    let rarity = [];
                    let num = [];
                    if (rows.length > 0) {
                        //initialize pages
                        pages[page - 1] = "Card | # | Rarity";
                        card[page - 1] = "";
                        rarity[page - 1] = "";
                        num[page - 1] = "";
                        //adds card to array if it is in the pack and at the correct rarity
                        for(var z = 0; z < rows.length; z++){
                            if(comList.includes(rows[z].cardName) && rows[z].cardRarity === 'Common'){
                                commons[commons.length] = rows[z].cardName;
                            }
                            if(uncomList.includes(rows[z].cardName) && rows[z].cardRarity === 'Uncommon'){
                                uncommons[uncommons.length] = rows[z].cardName;
                            }
                            if(rareList.includes(rows[z].cardName) && rows[z].cardRarity === 'Rare'){
                                rares[rares.length] = rows[z].cardName;
                            }
                            if(ultraList.includes(rows[z].cardName) && rows[z].cardRarity === 'Ultra'){
                                ultras[ultras.length] = rows[z].cardName;
                            }
                        }
                        //compares arrays and adds missing cards to the embed page
                        for(var x = 0; x < comList.length; x++){
                            if(!commons.includes(comList[x])){
                                card[curPage] += comList[x] + "\n";
                                rarity[curPage] += "Common \n";
                                num[curPage] += "x0 \n";
                                count++;
                            }
                            if(count === 25){
                                curPage++;
                                card[curPage] = "";
                                rarity[curPage] = "";
                                num[curPage] = "";
                            }
                        }
                        for(var x = 0; x < uncomList.length; x++){
                            if(!uncommons.includes(uncomList[x])){
                                card[curPage] += uncomList[x] + "\n";
                                rarity[curPage] += "Uncommon \n";
                                num[curPage] += "x0 \n";
                                count++;
                            }
                            if(count === 25){
                                curPage++;
                                card[curPage] = "";
                                rarity[curPage] = "";
                                num[curPage] = "";
                            }
                        }
                        for(var x = 0; x < rareList.length; x++){
                            if(!rares.includes(rareList[x])){
                                card[curPage] += rareList[x] + "\n";
                                rarity[curPage] += "Rare \n";
                                num[curPage] += "x0 \n";
                                count++;
                            }
                            if(count === 25){
                                curPage++;
                                card[curPage] = "";
                                rarity[curPage] = "";
                                num[curPage] = "";
                            }
                        }
                        for(var x = 0; x < ultraList.length; x++){
                            if(!ultras.includes(ultraList[x])){
                                card[curPage] += ultraList[x] + "\n";
                                rarity[curPage] += "Ultra \n";
                                num[curPage] += "x0 \n";
                                count++;
                            }
                            if(count === 25){
                                curPage++;
                                card[curPage] = "";
                                rarity[curPage] = "";
                                num[curPage] = "";
                            }
                        }
                        //if the page is empty
                       if(card[page - 1] === ""){
                           msg.reply('You have at least one of every card in this pack!');
                       } else {
                           //add pages to embed and send the embed.
                            pages[page - 1] += "";
                            embed.setColor('AQUA'); 
                            embed.addField("Card",card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity",rarity[page - 1], true)
                            embed.setFooter(`Page ${page}`)
                            //look for a reaction and then change page accordingly
                            msg.channel.send(embed).then(msg => {
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
                                        if (page === 1) return;
                                        page--;
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
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
                                        if (page === card.length) return;
                                        page++;
                                        let exists = false;
                                        if (card[page - 1] !== undefined && card[page - 1] != "") {
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                            exists = true;
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        } else {
                                            pages[page - 1] = "Card \t # \t Rarity \n";
                                            card[page - 1] = "";
                                            rarity[page - 1] = "";
                                            num[page - 1] = "";

                                            for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            }
                                            per += 25;
                                            
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        }
                                    })
                                })
                            })
                        }
                    } else {
                        msg.reply("You currently don't have any cards!");
                    }
                })
                //everything below is a repeat from above just for packs that need special cases
            }  else if(custom.includes(args[1].toLowerCase())){
                if(args[1].toLowerCase() === 'custom3'){
                    let comList = pack.get(args[1].toLowerCase()).common;
                    let uncomList = pack.get(args[1].toLowerCase()).uncommon;
                    let rareList = pack.get(args[1].toLowerCase()).rare;
                    let ultraList = pack.get(args[1].toLowerCase()).epic;
                    let secretList = pack.get(args[1].toLowerCase()).secret;
                    let commons = [];
                    let uncommons = [];
                    let rares = [];
                    let ultras = [];
                    let secrets = [];
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' ORDER BY cardName`, (err, rows) => {
                        if (err) throw err;

                        let sql;
                        let count = 0;
                        let curPage = 0;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for(var z = 0; z < rows.length; z++){
                                if(comList.includes(rows[z].cardName) && rows[z].cardRarity === 'Common'){
                                    commons[commons.length] = rows[z].cardName;
                                }
                                if(uncomList.includes(rows[z].cardName) && rows[z].cardRarity === 'Uncommon'){
                                    uncommons[uncommons.length] = rows[z].cardName;
                                }
                                if(rareList.includes(rows[z].cardName) && rows[z].cardRarity === 'Rare'){
                                    rares[rares.length] = rows[z].cardName;
                                }
                                if(ultraList.includes(rows[z].cardName) && rows[z].cardRarity === 'Ultra'){
                                    ultras[ultras.length] = rows[z].cardName;
                                }
                                if(secretList.includes(rows[z].cardName) && rows[z].cardRarity === 'Secret'){
                                    secrets[secrets.length] = rows[z].cardName;
                                }
                            }
                            for(var x = 0; x < comList.length; x++){
                                if(!commons.includes(comList[x])){
                                    card[curPage] += comList[x] + "\n";
                                    rarity[curPage] += "Common \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            for(var x = 0; x < uncomList.length; x++){
                                if(!uncommons.includes(uncomList[x])){
                                    card[curPage] += uncomList[x] + "\n";
                                    rarity[curPage] += "Uncommon \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            for(var x = 0; x < rareList.length; x++){
                                if(!rares.includes(rareList[x])){
                                    card[curPage] += rareList[x] + "\n";
                                    rarity[curPage] += "Rare \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            for(var x = 0; x < ultraList.length; x++){
                                if(!ultras.includes(ultraList[x])){
                                    card[curPage] += ultraList[x] + "\n";
                                    rarity[curPage] += "Ultra \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            for(var x = 0; x < secretList.length; x++){
                                if(!secrets.includes(secretList[x])){
                                    card[curPage] += secretList[x] + "\n";
                                    rarity[curPage] += "Secret \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }

                        if(card[page - 1] === ""){
                            msg.reply('You have at least one of every card in this pack!');
                        } else {
                                pages[page - 1] += "";
                                embed.setColor('AQUA'); 
                                embed.addField("Card",card[page - 1], true)
                                embed.addField('#', num[page - 1], true)
                                embed.addField("Rarity",rarity[page - 1], true)
                                embed.setFooter(`Page ${page}`)
                                msg.channel.send(embed).then(msg => {
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
                                            if (page === 1) return;
                                            page--;
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
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
                                            if (page === card.length) return;
                                            page++;
                                            let exists = false;
                                            if (card[page - 1] !== undefined && card[page - 1] != "") {
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                                exists = true;
                                                embed.setFooter(`Page ${page}`);
                                                msg.edit(embed);
                                            } else {
                                                pages[page - 1] = "Card \t # \t Rarity \n";
                                                card[page - 1] = "";
                                                rarity[page - 1] = "";
                                                num[page - 1] = "";

                                                for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                    card[page - 1] += rows[c].cardName + "\n";
                                                    rarity[page - 1] += rows[c].cardRarity + "\n";
                                                    num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                                }
                                                per += 25;
                                                
                                                if(card[page - 1] != ""){
                                                    embed.addField("Card",card[page - 1], true)
                                                    embed.addField('#', num[page - 1], true)
                                                    embed.addField("Rarity",rarity[page - 1], true)
                                                }
                                                embed.setFooter(`Page ${page}`);
                                                msg.edit(embed);
                                            }
                                        })
                                    })
                                })
                            }
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                } else if(args[1].toLowerCase() === 'db1'){
                    let comList = pack.get(args[1].toLowerCase()).common;
                    let rareList = pack.get(args[1].toLowerCase()).rare;
                    let commons = [];
                    let rares = [];
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' ORDER BY cardName`, (err, rows) => {
                        if (err) throw err;

                        let sql;
                        let count = 0;
                        let curPage = 0;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for(var z = 0; z < rows.length; z++){
                                if(comList.includes(rows[z].cardName) && rows[z].cardRarity === 'Common'){
                                    commons[commons.length] = rows[z].cardName;
                                }
                                if(rareList.includes(rows[z].cardName) && rows[z].cardRarity === 'Rare'){
                                    rares[rares.length] = rows[z].cardName;
                                }
                            }
                            for(var x = 0; x < comList.length; x++){
                                if(!commons.includes(comList[x])){
                                    card[curPage] += comList[x] + "\n";
                                    rarity[curPage] += "Common \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            for(var x = 0; x < rareList.length; x++){
                                if(!rares.includes(rareList[x])){
                                    card[curPage] += rareList[x] + "\n";
                                    rarity[curPage] += "Rare \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            /*
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }

                            }
                            */
                        if(card[page - 1] === ""){
                            msg.reply('You have at least one of every card in this pack!');
                        } else {
                                pages[page - 1] += "";
                                embed.setColor('AQUA'); 
                                embed.addField("Card",card[page - 1], true)
                                embed.addField('#', num[page - 1], true)
                                embed.addField("Rarity",rarity[page - 1], true)
                                embed.setFooter(`Page ${page}`)
                                msg.channel.send(embed).then(msg => {
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
                                            if (page === 1) return;
                                            page--;
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
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
                                            if (page === card.length) return;
                                            page++;
                                            let exists = false;
                                            if (card[page - 1] !== undefined && card[page - 1] != "") {
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                                exists = true;
                                                embed.setFooter(`Page ${page}`);
                                                msg.edit(embed);
                                            } else {
                                                pages[page - 1] = "Card \t # \t Rarity \n";
                                                card[page - 1] = "";
                                                rarity[page - 1] = "";
                                                num[page - 1] = "";

                                                for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                    card[page - 1] += rows[c].cardName + "\n";
                                                    rarity[page - 1] += rows[c].cardRarity + "\n";
                                                    num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                                }
                                                per += 25;
                                                
                                                if(card[page - 1] != ""){
                                                    embed.addField("Card",card[page - 1], true)
                                                    embed.addField('#', num[page - 1], true)
                                                    embed.addField("Rarity",rarity[page - 1], true)
                                                }
                                                embed.setFooter(`Page ${page}`);
                                                msg.edit(embed);
                                            }
                                        })
                                    })
                                })
                            }
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                } else if(args[1].toLowerCase() === 'tourney1'){
                    let ultraList = pack.get(args[1].toLowerCase()).epic;
                    let ultras = [];
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' ORDER BY cardName`, (err, rows) => {
                        if (err) throw err;

                        let sql;
                        let count = 0;
                        let curPage = 0;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for(var z = 0; z < rows.length; z++){
                                if(ultraList.includes(rows[z].cardName) && rows[z].cardRarity === 'Ultra'){
                                    ultras[ultras.length] = rows[z].cardName;
                                }
                            }
                            for(var x = 0; x < ultraList.length; x++){
                                if(!ultras.includes(ultraList[x])){
                                    card[curPage] += ultraList[x] + "\n";
                                    rarity[curPage] += "Ultra \n";
                                    num[curPage] += "x0 \n";
                                    count++;
                                }
                                if(count === 25){
                                    curPage++;
                                    card[curPage] = "";
                                    rarity[curPage] = "";
                                    num[curPage] = "";
                                }
                            }
                            /*
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }

                            }
                            */
                        if(card[page - 1] === ""){
                            msg.reply('You have at least one of every card in this pack!');
                        } else {
                                pages[page - 1] += "";
                                embed.setColor('AQUA'); 
                                embed.addField("Card",card[page - 1], true)
                                embed.addField('#', num[page - 1], true)
                                embed.addField("Rarity",rarity[page - 1], true)
                                embed.setFooter(`Page ${page}`)
                                msg.channel.send(embed).then(msg => {
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
                                            if (page === 1) return;
                                            page--;
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
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
                                            if (page === card.length) return;
                                            page++;
                                            let exists = false;
                                            if (card[page - 1] !== undefined && card[page - 1] != "") {
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                                exists = true;
                                                embed.setFooter(`Page ${page}`);
                                                msg.edit(embed);
                                            } else {
                                                pages[page - 1] = "Card \t # \t Rarity \n";
                                                card[page - 1] = "";
                                                rarity[page - 1] = "";
                                                num[page - 1] = "";

                                                for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                    card[page - 1] += rows[c].cardName + "\n";
                                                    rarity[page - 1] += rows[c].cardRarity + "\n";
                                                    num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                                }
                                                per += 25;
                                                
                                                if(card[page - 1] != ""){
                                                    embed.addField("Card",card[page - 1], true)
                                                    embed.addField('#', num[page - 1], true)
                                                    embed.addField("Rarity",rarity[page - 1], true)
                                                }
                                                embed.setFooter(`Page ${page}`);
                                                msg.edit(embed);
                                            }
                                        })
                                    })
                                })
                            }
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                }
            }
        }
    }
}