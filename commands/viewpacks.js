const dmbasic = "legendblue\nmetalraider\nmagicruler\npservant\nlabnight\nldarkness\npguardian\nmagicforce\ndcrisis\nichaos\nasanctuary\nsoulduel\nrdestiny\nfeternity\ndb1\nallcards";
const gxbasic = "lostm\ncyrev\nelenergy\nsinfinity\nejustice\npduel\ncyimpact";
const dmcustom = "custom1\ndemonstuff\ncustom3\ncustom4\ncustom5";
const gxcustom = "custom6\ntourney1"
const customcards = "newbeginnings\ndestinedroads";
module.exports = {
    name: 'viewpacks',
    description: "Lets users see available packs",
    execute(msg, Discord){
        let k = msg.author.id;
        let page = 1;
        let pages = 3;
        const embed = new Discord.MessageEmbed()
            .setTitle('Available Packs')
            .addField('DM Basic', dmbasic)
            .addField('DM Custom', dmcustom)
            .setFooter(`Page ${page} out of ${pages}`);
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
                    embed.spliceFields(0, 2);
                    if (page === 1) return;
                    page--;
                    switch(page){
                        case 1:
                            embed.addField('DM Basic', dmbasic);
                            embed.addField('DM Custom', dmcustom);
                        break;
                        case 2:
                            embed.addField('GX Basic', gxbasic);
                            embed.addField('GX Custom', gxcustom);
                        break;
                        case 3:
                            embed.addField('Custom Card Packs', customcards);
                        break;
                    }
                    embed.setFooter(`Page ${page} out of ${pages}`);
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
                    embed.spliceFields(0, 2);
                    if (page === 3) return;
                    page++;
                    
                    switch(page){
                        case 1:
                            embed.addField('DM Basic', dmbasic);
                            embed.addField('DM Custom', dmcustom);
                        break;
                        case 2:
                            embed.addField('GX Basic', gxbasic);
                            embed.addField('GX Custom', gxcustom);
                        break;
                        case 3:
                            embed.addField('Custom Card Packs', customcards);
                        break;
                    }
                    embed.setFooter(`Page ${page} out of ${pages}`);
                    msg.edit(embed);
                    
                })
            })    
        });
    }
}