const packs = ["cyimpact","ejustice","pduel","sinfinity","tourney1","custom6","lostm","cyrev","elenergy","custom4","custom5","rdestiny","feternity","soulduel","asanctuary","ichaos","destinedroads","custom3","db1","custom1","allcards","demonstuff","newbeginnings","legendblue", "metalraider", "magicruler","pservant","labnight","ldarkness","pguardian","dcrisis","magicforce"];
const decks = ["dark","earth","light","water","wind","swordmasters","ancientarmy","heroforce","rockpower"];
module.exports = {
    name: 'view',
    description: "Command to view the number of points you have",
    execute(msg, args, pack, deck, Discord){
        var k = msg.author.id;
        if(args.length === 2){
            let name = args[1]; 
            const packEmbed = new Discord.MessageEmbed().setTitle(name.toLowerCase());
            if(packs.includes(name.toLowerCase())){
                if(name.toLowerCase() === "allcards"){
                    packEmbed.addField("Cost","150");
                    packEmbed.addField("Cards","Contains every card currently in the bot!");
                    msg.channel.send(packEmbed);
                    return;
                }
                if(name.toLowerCase() === "tourney1"){
                    packEmbed.addField("Cost",pack.get(name.toLowerCase()).price)
                    let page = 1;
                    let pages = 5;
                    let ultraList = pack.get(name.toLowerCase()).epic;
                    let ultra1 = "";
                    let ultra2 = "";
                    let ultra3 = "";
                    let ultra4 = "";
                    let ultra5 = "";
                    for(let i = 0; i < Math.floor(ultraList.length/5); i++){
                        ultra1 += ultraList[i] + "\n";
                    }
                    for(let i = Math.floor(ultraList.length/5) + 1; i < (Math.floor(ultraList.length/5) * 2); i++){
                        ultra2 += ultraList[i] + "\n";
                    }
                    for(let i = Math.floor(ultraList.length/5) * 2 + 1; i < (Math.floor(ultraList.length/5) * 3); i++){
                        ultra3 += ultraList[i] + "\n";
                    }
                    for(let i = Math.floor(ultraList.length/5) * 3 + 1; i < (Math.floor(ultraList.length/5) * 4); i++){
                        ultra4 += ultraList[i] + "\n";
                    }
                    for(let i = Math.floor(ultraList.length/5) * 4 + 1; i < ultraList.length; i++){
                        ultra5 += ultraList[i] + "\n";
                    }
                    packEmbed.addField("Ultra 1",ultra1);
                    packEmbed.setFooter(`Page ${page} out of ${pages}`)
                    msg.channel.send(packEmbed).then(msg =>{
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
                                packEmbed.spliceFields(1, 1);
                                if (page === 1) return;
                                page--;
                                switch(page){
                                    case 1:
                                        packEmbed.addField("Ultra 1",ultra1);
                                    break;
                                    case 2:
                                        packEmbed.addField("Ultra 2",ultra2);
                                    break;
                                    case 3:
                                        packEmbed.addField("Ultra 3",ultra3);
                                    break;
                                    case 4:
                                        packEmbed.addField("Ultra 4",ultra4);
                                    break;
                                    case 5:
                                        packEmbed.addField("Ultra 5",ultra5);
                                    break;
                                }
                                packEmbed.setFooter(`Page ${page} out of ${pages}`);
                                msg.edit(packEmbed);
            
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
                                packEmbed.spliceFields(1, 1);
                                if (page === 5) return;
                                page++;
                                
                                switch(page){
                                    case 1:
                                        packEmbed.addField("Ultra 1",ultra1);
                                    break;
                                    case 2:
                                        packEmbed.addField("Ultra 2",ultra2);
                                    break;
                                    case 3:
                                        packEmbed.addField("Ultra 3",ultra3);
                                    break;
                                    case 4:
                                        packEmbed.addField("Ultra 4",ultra4);
                                    break;
                                    case 5:
                                        packEmbed.addField("Ultra 5",ultra5);
                                    break;
                                }
                                packEmbed.setFooter(`Page ${page} out of ${pages}`);
                                msg.edit(packEmbed);
                                
                            })
                        })
                    })
                    return;
                }
                if(name.toLowerCase() === "custom3"){
                    packEmbed.addField("Cost",pack.get(name.toLowerCase()).price)
                    let page = 1;
                    let pages = 5;
                    let comList = pack.get(name.toLowerCase()).common;
                    let uncomList = pack.get(name.toLowerCase()).uncommon;
                    let rareList = pack.get(name.toLowerCase()).rare;
                    let ultraList = pack.get(name.toLowerCase()).epic;
                    let secretList = pack.get(name.toLowerCase()).secret;
                    let common = "";
                    let secret= "";
                    let uncommon = "";
                    let rare = "";
                    let ultra = "";
                    for(let i = 0; i < comList.length; i++){
                        common += comList[i] + "\n";
                    }
                    for(let i = 0; i < secretList.length; i++){
                        secret += secretList[i] + "\n";
                    }
                    for(let i = 0; i < uncomList.length; i++){
                        uncommon += uncomList[i] + "\n";
                    }
                    for(let i = 0; i < rareList.length; i++){
                        rare += rareList[i] + "\n";
                    }
                    for(let i = 0; i < ultraList.length; i++){
                        ultra += ultraList[i] + "\n";
                    }
                    packEmbed.addField("Commons",common);
                    packEmbed.setFooter(`Page ${page} out of ${pages}`)
                    msg.channel.send(packEmbed).then(msg =>{
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
                                packEmbed.spliceFields(1, 1);
                                if (page === 1) return;
                                page--;
                                switch(page){
                                    case 1:
                                        packEmbed.addField("Commons",common);
                                    break;
                                    case 2:
                                        packEmbed.addField("Uncommons",uncommon);
                                    break;
                                    case 3:
                                        packEmbed.addField("Rares",rare);
                                    break;
                                    case 4:
                                        packEmbed.addField("Ultras",ultra);
                                    break;
                                    case 5:
                                        packEmbed.addField("Secrets",secret);
                                    break;
                                }
                                packEmbed.setFooter(`Page ${page} out of ${pages}`);
                                msg.edit(packEmbed);
            
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
                                packEmbed.spliceFields(1, 1);
                                if (page === 5) return;
                                page++;
                                
                                switch(page){
                                    case 1:
                                        packEmbed.addField("Commons",common);
                                    break;
                                    case 2:
                                        packEmbed.addField("Uncommons",uncommon);
                                    break;
                                    case 3:
                                        packEmbed.addField("Rares",rare);
                                    break;
                                    case 4:
                                        packEmbed.addField("Ultras",ultra);
                                    break;
                                    case 5:
                                        packEmbed.addField("Secrets",secret);
                                    break;
                                }
                                packEmbed.setFooter(`Page ${page} out of ${pages}`);
                                msg.edit(packEmbed);
                                
                            })
                        })
                    })
                    return;
                }
                if(name.toLowerCase() === "db1"){
                    packEmbed.addField("Cost",pack.get(name.toLowerCase()).price)
                    let page = 1;
                    let pages = 5;
                    let comList = pack.get(name.toLowerCase()).common;
                    let rareList = pack.get(name.toLowerCase()).rare;
                    let common = "";
                    let common2 = "";
                    let common3 = "";
                    let rare = "";
                    let rare2 = "";
                    
                    for(let i = 0; i < Math.floor(comList.length/3); i++){
                        common += comList[i] + "\n";
                    }
                    for(let i = Math.floor(comList.length/3) + 1; i < Math.floor(comList.length/3) + Math.floor(comList.length/3); i++){
                        common2 += comList[i] + "\n";
                    }
                    for(let i = Math.floor(comList.length/3) + Math.floor(comList.length/3) + 1; i < comList.length; i++){
                        common3 += comList[i] + "\n";
                    }
                    for(let i = 0; i < Math.floor(rareList.length/2); i++){
                        rare += rareList[i] + "\n";
                    }
                    for(let i = Math.floor(rareList.length/2) + 1; i < rareList.length; i++){
                        rare2 += rareList[i] + "\n";
                    }
                    packEmbed.addField("Commons",common);
                    packEmbed.setFooter(`Page ${page} out of ${pages}`)
                    msg.channel.send(packEmbed).then(msg =>{
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
                                packEmbed.spliceFields(1, 1);
                                if (page === 1) return;
                                page--;
                                switch(page){
                                    case 1:
                                        packEmbed.addField("Commons",common);
                                    break;
                                    case 2:
                                        packEmbed.addField("Commons",common2);
                                    break;
                                    case 3:
                                        packEmbed.addField("Commons",common3);
                                    break;
                                    case 4:
                                        packEmbed.addField("Rares",rare);
                                    break;
                                    case 5:
                                        packEmbed.addField("Rares",rare2);
                                    break;
                                }
                                packEmbed.setFooter(`Page ${page} out of ${pages}`);
                                msg.edit(packEmbed);
            
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
                                packEmbed.spliceFields(1, 1);
                                if (page === 5) return;
                                page++;
                                
                                switch(page){
                                    case 1:
                                        packEmbed.addField("Commons",common);
                                    break;
                                    case 2:
                                        packEmbed.addField("Commons",common2);
                                    break;
                                    case 3:
                                        packEmbed.addField("Commons",common3);
                                    break;
                                    case 4:
                                        packEmbed.addField("Rares",rare);
                                    break;
                                    case 5:
                                        packEmbed.addField("Rares",rare2);
                                    break;
                                }
                                packEmbed.setFooter(`Page ${page} out of ${pages}`);
                                msg.edit(packEmbed);
                                
                            })
                        })
                    });    
                    return;
                }
                packEmbed.addField("Cost",pack.get(name.toLowerCase()).price)
                let page = 1;
                let pages = 5;
                let comList = pack.get(name.toLowerCase()).common;
                let uncomList = pack.get(name.toLowerCase()).uncommon;
                let rareList = pack.get(name.toLowerCase()).rare;
                let ultraList = pack.get(name.toLowerCase()).epic;
                let common = "";
                let common2 = "";
                let uncommon = "";
                let rare = "";
                let ultra = "";
                for(let i = 0; i < Math.floor(comList.length/2); i++){
                    common += comList[i] + "\n";
                }
                for(let i = Math.floor(comList.length/2) + 1; i < comList.length; i++){
                    common2 += comList[i] + "\n";
                }
                for(let i = 0; i < uncomList.length; i++){
                    uncommon += uncomList[i] + "\n";
                }
                for(let i = 0; i < rareList.length; i++){
                    rare += rareList[i] + "\n";
                }
                for(let i = 0; i < ultraList.length; i++){
                    ultra += ultraList[i] + "\n";
                }
                packEmbed.addField("Commons",common);
                packEmbed.setFooter(`Page ${page} out of ${pages}`)
                msg.channel.send(packEmbed).then(msg =>{
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
                            packEmbed.spliceFields(1, 1);
                            if (page === 1) return;
                            page--;
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Commons",common2);
                                break;
                                case 3:
                                    packEmbed.addField("Uncommons",uncommon);
                                break;
                                case 4:
                                    packEmbed.addField("Rares",rare);
                                break;
                                case 5:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
        
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
                            packEmbed.spliceFields(1, 1);
                            if (page === 5) return;
                            page++;
                            
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Commons",common2);
                                break;
                                case 3:
                                    packEmbed.addField("Uncommons",uncommon);
                                break;
                                case 4:
                                    packEmbed.addField("Rares",rare);
                                break;
                                case 5:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
                            
                        })
                    })
                });    
            }
            if(decks.includes(name.toLowerCase())){
                packEmbed.addField("Cost",deck.get(name.toLowerCase()).price)
                let page = 1;
                let pages = 4;
                let comList = deck.get(name.toLowerCase()).common;
                let uncomList = deck.get(name.toLowerCase()).uncommon;
                let rareList = deck.get(name.toLowerCase()).rare;
                let ultraList = deck.get(name.toLowerCase()).ultra;
                let common = "";
                let uncommon = "";
                let rare = "";
                let ultra = "";
                for(let i = 0; i < comList.length; i++){
                    common += comList[i] + "\n";
                }
                for(let i = 0; i < uncomList.length; i++){
                    uncommon += uncomList[i] + "\n";
                }
                for(let i = 0; i < rareList.length; i++){
                    rare += rareList[i] + "\n";
                }
                for(let i = 0; i < ultraList.length; i++){
                    ultra += ultraList[i] + "\n";
                }
                packEmbed.addField("Commons",common);
                packEmbed.setFooter(`Page ${page} out of ${pages}`)
                msg.channel.send(packEmbed).then(msg =>{
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
                            packEmbed.spliceFields(1, 1);
                            if (page === 1) return;
                            page--;
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Uncommons",uncommon);
                                break;
                                case 3:
                                    packEmbed.addField("Rares",rare);
                                break;
                                case 4:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
        
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
                            packEmbed.spliceFields(1, 1);
                            if (page === 4) return;
                            page++;
                            
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Uncommons",uncommon);
                                break;
                                case 3:
                                    packEmbed.addField("Rares",rare);
                                break;
                                case 4:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
                            
                        })
                    })
                });    
            }
        } else {
            msg.reply("Please provide a pack or deck to view! ex. k!view legendblue");
        }       
    }
}