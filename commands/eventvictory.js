module.exports = {
    name: 'evictory',
    description: "Lets users claim the victory for a ranked duel!",
    execute(msg, args, con, coconut, walnut, challengers, challenge, admin, signer, darksigner){
        if(args < 2 || args[1] < 2){
            msg.reply("Please provide the match score! ex. kb!rvictory 2 1");
        }
        else{
            switch(args[2]){
                case "0":
                    if (challengers.includes(msg.author.id)) {
                        var x = challengers.indexOf(msg.author.id);
                        let n = challenge[x];
                        let m = challengers[x];
                        let nn = coconut[x];
                        let mm = walnut[x];
                        msg.channel.sendMessage(msg.author + ' claims they have won the duel, ' + coconut[x] + ' do you confirm?').then(msg => {
                            msg.react('✅').then(r => {
                                msg.react('❌')

                                const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                                const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                                const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                                const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                                agr.on('collect', r => {
                                    
                                    if(mm.roles.has(signer.id)){
                                        signers = signer.members;
                                        signers.forEach((member, key) => 
                                            con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
                                            
                                                if (rows.length > 0) {
                                                    let point = parseInt(rows[0].points + 10);
                                                    sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                    con.query(sql, console.log);
                                                }
    
                                            })
                                        )
                                        con.query(`SELECT * FROM event WHERE team = 'signer'`, (err, rows) => {
                                            if (err) throw err;

                                            let sql;

                                            if(rows.length > 0) {
                                                let win = parseInt(rows[0].wins + 1);
                                                sql = `UPDATE event SET wins = ${win} WHERE team = 'signer'`;
                                                con.query(sql, console.log);
                                            }
                                        })
                                    }
                                    
                                    if(mm.roles.has(darksigner.id)){
                                        darksigners = darksigner.members;
                                        darksigners.forEach((member, key) => 
                                            con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
                                            
                                                if (rows.length > 0) {
                                                    let point = parseInt(rows[0].points + 10);
                                                    sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                    con.query(sql, console.log);
                                                }
    
                                            })
                                        )
                                        con.query(`SELECT * FROM event WHERE team = 'darksigner'`, (err, rows) => {
                                            if (err) throw err;

                                            let sql;

                                            if(rows.length > 0) {
                                                let win = parseInt(rows[0].wins + 1);
                                                sql = `UPDATE event SET wins = ${win} WHERE team = 'darksigner'`;
                                                con.query(sql, console.log);
                                            }
                                        })
                                    }
                                    
                                    msg.channel.sendMessage('Congrats ' + walnut[x] + ' on the victory! Your team has been given 10 Kaiba Tokens!');
                                    challenge.splice(x, 1);
                                    challengers.splice(x, 1);
                                    walnut.splice(x, 1);
                                    coconut.splice(x, 1);
                                })
                                decl.on('collect', r => {
                                    msg.channel.sendMessage('Fetching an ' + admin + '. Please wait.');
                                    challenge.splice(x, 1);
                                    challengers.splice(x, 1);
                                    walnut.splice(x, 1);
                                    coconut.splice(x, 1);

                                })
                            })
                        })

                    } else if (challenge.includes(msg.author.id)) {
                        var x = challenge.indexOf(msg.author.id);
                        let n = challenge[x];
                        let m = challengers[x];
                        let nn = coconut[x];
                        let mm = walnut[x];
                        msg.channel.sendMessage(msg.author + ' claims they have won the duel, ' + walnut[x] + ' do you confirm?').then(msg => {
                            msg.react('✅').then(r => {
                                msg.react('❌')

                                const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                                const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                                const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                                const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                                agr.on('collect', r => {
                                    if(nn.roles.has(signer.id)){
                                        signers = signer.members;
                                        signers.forEach((member, key) => 
                                            con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
                                            
                                                if (rows.length > 0) {
                                                    let point = parseInt(rows[0].points + 10);
                                                    sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                    con.query(sql, console.log);
                                                }
    
                                            })
                                        )
                                        con.query(`SELECT * FROM event WHERE team = 'signer'`, (err, rows) => {
                                            if (err) throw err;

                                            let sql;

                                            if(rows.length > 0) {
                                                let win = parseInt(rows[0].wins + 1);
                                                sql = `UPDATE event SET wins = ${win} WHERE team = 'signer'`;
                                                con.query(sql, console.log);
                                            }
                                        })
                                    }
                                    
                                    if(nn.roles.has(darksigner.id)){
                                        darksigners = darksigner.members;
                                        darksigners.forEach((member, key) => 
                                            con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
                                            
                                                if (rows.length > 0) {
                                                    let point = parseInt(rows[0].points + 10);
                                                    sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                    con.query(sql, console.log);
                                                }
    
                                            })
                                        )
                                        con.query(`SELECT * FROM event WHERE team = 'darksigner'`, (err, rows) => {
                                            if (err) throw err;

                                            let sql;

                                            if(rows.length > 0) {
                                                let win = parseInt(rows[0].wins + 1);
                                                sql = `UPDATE event SET wins = ${win} WHERE team = 'darksigner'`;
                                                con.query(sql, console.log);
                                            }
                                        })
                                    }

                                    msg.channel.sendMessage('Congrats ' + coconut[x] + ' on the victory! Your team has been given 10 Kaiba Tokens!');
                                    challenge.splice(x, 1);
                                    challengers.splice(x, 1);
                                    walnut.splice(x, 1);
                                    coconut.splice(x, 1);
                                })
                                decl.on('collect', r => {
                                    msg.channel.sendMessage('Fetching an ' + admin + '. Please wait.');
                                    challenge.splice(x, 1);
                                    challengers.splice(x, 1);
                                    walnut.splice(x, 1);
                                    coconut.splice(x, 1);

                                })
                            })
                        })
                    } else {
                        msg.reply('You are currently not in a duel!');
                    }
                    break;
                    case "1":
                        if (challengers.includes(msg.author.id)) {
                            var x = challengers.indexOf(msg.author.id);
                            let n = challenge[x];
                            let m = challengers[x];
                            let nn = coconut[x];
                            let mm = walnut[x];
                            msg.channel.sendMessage(msg.author + ' claims they have won the duel, ' + coconut[x] + ' do you confirm?').then(msg => {
                                msg.react('✅').then(r => {
                                    msg.react('❌')
    
                                    const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                                    const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];
    
                                    const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                                    const decl = msg.createReactionCollector(declFilt, { time: 300000 });
    
                                    agr.on('collect', r => {
                                        
                                        if(mm.roles.has(signer.id)){
                                            signers = signer.members;
                                            signers.forEach((member, key) => 
                                                con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                    if (err) throw err;
        
                                                    let sql;
                                                
                                                    if (rows.length > 0) {
                                                        let point = parseInt(rows[0].points + 10);
                                                        sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                        con.query(sql, console.log);
                                                    }
        
                                                })
                                            )
                                            con.query(`SELECT * FROM event WHERE team = 'signer'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
    
                                                if(rows.length > 0) {
                                                    let win = parseInt(rows[0].wins + 1);
                                                    sql = `UPDATE event SET wins = ${win} WHERE team = 'signer'`;
                                                    con.query(sql, console.log);
                                                }
                                            })
                                        }
                                        
                                        if(mm.roles.has(darksigner.id)){
                                            darksigners = darksigner.members;
                                            darksigners.forEach((member, key) => 
                                                con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                    if (err) throw err;
        
                                                    let sql;
                                                
                                                    if (rows.length > 0) {
                                                        let point = parseInt(rows[0].points + 10);
                                                        sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                        con.query(sql, console.log);
                                                    }
        
                                                })
                                            )
                                            con.query(`SELECT * FROM event WHERE team = 'darksigner'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
    
                                                if(rows.length > 0) {
                                                    let win = parseInt(rows[0].wins + 1);
                                                    sql = `UPDATE event SET wins = ${win} WHERE team = 'darksigner'`;
                                                    con.query(sql, console.log);
                                                }
                                            })
                                        }
    
                                    
                                        
                                        msg.channel.sendMessage('Congrats ' + walnut[x] + ' on the victory! Your team has been given 10 Kaiba Tokens!');
                                        challenge.splice(x, 1);
                                        challengers.splice(x, 1);
                                        walnut.splice(x, 1);
                                        coconut.splice(x, 1);
                                    })
                                    decl.on('collect', r => {
                                        msg.channel.sendMessage('Fetching an ' + admin + '. Please wait.');
                                        challenge.splice(x, 1);
                                        challengers.splice(x, 1);
                                        walnut.splice(x, 1);
                                        coconut.splice(x, 1);
    
                                    })
                                })
                            })
    
                        } else if (challenge.includes(msg.author.id)) {
                            var x = challenge.indexOf(msg.author.id);
                            let n = challenge[x];
                            let m = challengers[x];
                            let nn = coconut[x];
                            let mm = walnut[x];
                            msg.channel.sendMessage(msg.author + ' claims they have won the duel, ' + walnut[x] + ' do you confirm?').then(msg => {
                                msg.react('✅').then(r => {
                                    msg.react('❌')
    
                                    const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                                    const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];
    
                                    const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                                    const decl = msg.createReactionCollector(declFilt, { time: 300000 });
    
                                    agr.on('collect', r => {
                                        if(nn.roles.has(signer.id)){
                                            signers = signer.members;
                                            signers.forEach((member, key) => 
                                                con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                    if (err) throw err;
        
                                                    let sql;
                                                
                                                    if (rows.length > 0) {
                                                        let point = parseInt(rows[0].points + 10);
                                                        sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                        con.query(sql, console.log);
                                                    }
        
                                                })
                                            )
                                            con.query(`SELECT * FROM event WHERE team = 'signer'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
    
                                                if(rows.length > 0) {
                                                    let win = parseInt(rows[0].wins + 1);
                                                    sql = `UPDATE event SET wins = ${win} WHERE team = 'signer'`;
                                                    con.query(sql, console.log);
                                                }
                                            })
                                        }
                                        
                                        if(nn.roles.has(darksigner.id)){
                                            darksigners = darksigner.members;
                                            darksigners.forEach((member, key) => 
                                                con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
                                                    if (err) throw err;
        
                                                    let sql;
                                                
                                                    if (rows.length > 0) {
                                                        let point = parseInt(rows[0].points + 10);
                                                        sql = `UPDATE points SET points = ${point} WHERE id = '${member.id}'`;
                                                        con.query(sql, console.log);
                                                    }
        
                                                })
                                            )
                                            con.query(`SELECT * FROM event WHERE team = 'darksigner'`, (err, rows) => {
                                                if (err) throw err;
    
                                                let sql;
    
                                                if(rows.length > 0) {
                                                    let win = parseInt(rows[0].wins + 1);
                                                    sql = `UPDATE event SET wins = ${win} WHERE team = 'darksigner'`;
                                                    con.query(sql, console.log);
                                                }
                                            })
                                        }
    
                                        
                                        msg.channel.sendMessage('Congrats ' + coconut[x] + ' on the victory! Your team have been given 10 Kaiba Tokens!');
                                        challenge.splice(x, 1);
                                        challengers.splice(x, 1);
                                        walnut.splice(x, 1);
                                        coconut.splice(x, 1);
                                    })
                                    decl.on('collect', r => {
                                        msg.channel.sendMessage('Fetching an ' + admin + '. Please wait.');
                                        challenge.splice(x, 1);
                                        challengers.splice(x, 1);
                                        walnut.splice(x, 1);
                                        coconut.splice(x, 1);
    
                                    })
                                })
                            })
                        } else {
                            msg.reply('You are currently not in a duel!');
                        }
            }
        }
    }
}