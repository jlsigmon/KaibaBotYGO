module.exports = {
    name: 'avictory',
    description: "Lets users claim the victory for a duel!",
    execute(msg, con, coconut, walnut, challengers, challenge, admin, avatar, dreadroot, eraser){
        let author = msg.author.username;
        let house = '';
        if(msg.member.roles.cache.has(avatar.id)){
            house = 'avatar';
        }
        if(msg.member.roles.cache.has(dreadroot.id)){
            house = 'dreadroot';
        }
        if(msg.member.roles.cache.has(eraser.id)){
            house = 'eraser';
        }
        if(msg.channel.name === 'bot-duels' || msg.channel.name === 'wild-format'){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 200);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 1);
                                        sql = `UPDATE house SET points = ${point} , userName = '${author}' WHERE userID = '${m}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM advance WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO advance (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE advance SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                    
                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                                
                                            }
            
                                        })
                                        msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                    }
                                }

                            })
                            con.query(`SELECT * FROM advance WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE advance SET lose = ${loses} WHERE id = '${n}'`;
                                con.query(sql3, console.log);

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 300);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    msg.channel.send('<@' + n + '> has earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 150);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);

                        })
                    })
                })

            } else if (challenge.includes(msg.author.id)) {
                var x = challenge.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 200);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 1);
                                        sql = `UPDATE house SET points = ${point} , userName = '${author}' WHERE userID = '${n}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM advance WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO advance (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE advance SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 300);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    msg.channel.send('<@' + m + '> has earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                }

                            })
                            con.query(`SELECT * FROM advance WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO advance (id, wins, lose) VALUES ('${n}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE advance SET wins = ${loses} WHERE id = '${n}'`;
                                    con.query(sql3, console.log);

                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
            
                                        })
                                        msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more standard wins!');
                                    }
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 150);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
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
        } else if (msg.channel.name === 'looking-to-duel-modern'){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points);
                                        let add = 1;
                                        sql = `UPDATE house SET points = ${point + add} AND userName = '${author}' WHERE userID = '${m}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM modern WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO modern (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE modern SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                    
                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 25);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                                
                                            }
            
                                        })
                                    }
                                }

                            })
                            con.query(`SELECT * FROM modern WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE modern SET lose = ${loses} WHERE id = '${n}'`;
                                con.query(sql3, console.log);

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 25);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + ' on the victory!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);

                        })
                    })
                })

            } else if (challenge.includes(msg.author.id)) {
                var x = challenge.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points);
                                        let add = 1;
                                        sql = `UPDATE house SET points = ${point + add} AND userName = '${author}' WHERE userID = '${n}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM modern WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO modern (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE modern SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 25);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                }

                            })
                            con.query(`SELECT * FROM modern WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO modern (id, wins, lose) VALUES ('${n}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE modern SET wins = ${loses} WHERE id = '${n}'`;
                                    con.query(sql3, console.log);

                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 25);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
            
                                        })
                                    }
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut[x].username + ' on the victory!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
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
        } else if (msg.channel.name === 'looking-to-duel-goat'){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points);
                                        let add = 1;
                                        sql = `UPDATE house SET points = ${point + add} AND userName = '${author}' WHERE userID = '${m}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM goat WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO goat (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE goat SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                    
                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 25);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                                
                                            }
            
                                        })
                                    }
                                }

                            })
                            con.query(`SELECT * FROM goat WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE goat SET lose = ${loses} WHERE id = '${n}'`;
                                con.query(sql3, console.log);

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 25);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + ' on the victory!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);

                        })
                    })
                })

            } else if (challenge.includes(msg.author.id)) {
                var x = challenge.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points);
                                        let add = 1;
                                        sql = `UPDATE house SET points = ${point + add} AND userName = '${author}' WHERE userID = '${n}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM goat WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO goat (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE goat SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 25);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                }

                            })
                            con.query(`SELECT * FROM goat WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO goat (id, wins, lose) VALUES ('${n}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE modern SET wins = ${loses} WHERE id = '${n}'`;
                                    con.query(sql3, console.log);

                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 25);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
            
                                        })
                                    }
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 20);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut[x].username + ' on the victory!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
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
        } else if(msg.channel.name === 'custom-format'){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 200);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 1);
                                        sql = `UPDATE house SET points = ${point} , userName = '${author}' WHERE userID = '${m}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM custom WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO custom (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE custom SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                    
                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                                
                                            }
            
                                        })
                                        msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                    }
                                }

                            })
                            con.query(`SELECT * FROM custom WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE custom SET lose = ${loses} WHERE id = '${n}'`;
                                con.query(sql3, console.log);

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 300);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    msg.channel.send('<@' + n + '> has earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 150);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);

                        })
                    })
                })

            } else if (challenge.includes(msg.author.id)) {
                var x = challenge.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 200);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 1);
                                        sql = `UPDATE house SET points = ${point} , userName = '${author}' WHERE userID = '${n}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM custom WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO custom (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE custom SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 300);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    msg.channel.send('<@' + m + '> has earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                }

                            })
                            con.query(`SELECT * FROM custom WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO custom (id, wins, lose) VALUES ('${n}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE custom SET wins = ${loses} WHERE id = '${n}'`;
                                    con.query(sql3, console.log);

                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
            
                                        })
                                        msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more standard wins!');
                                    }
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 150);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
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
        } else if(msg.channel.name === 'dm-bot-format'){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 200);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 1);
                                        sql = `UPDATE house SET points = ${point} , userName = '${author}' WHERE userID = '${m}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM dmbot WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO dmbot (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE dmbot SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                    
                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                                
                                            }
            
                                        })
                                        msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                    }
                                }

                            })
                            con.query(`SELECT * FROM dmbot WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE custom SET lose = ${loses} WHERE id = '${n}'`;
                                con.query(sql3, console.log);

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 300);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    msg.channel.send('<@' + n + '> has earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 150);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);

                        })
                    })
                })

            } else if (challenge.includes(msg.author.id)) {
                var x = challenge.indexOf(msg.author.id);
                var n = challenge[x];
                var m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 200);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            if(house !== ''){
                                con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                    if (err) throw err;

                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 1);
                                        sql = `UPDATE house SET points = ${point} , userName = '${author}' WHERE userID = '${n}'`;
                                        con.query(sql, console.log);
                                    } else {
                                        sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 1, '${author}')`;
                                        con.query(sql, console.log);
                                    }

                                })
                            }
                            con.query(`SELECT * FROM custom WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO custom (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE custom SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                                if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                    con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;
        
                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 300);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                            
                                        }
        
                                    })
                                    msg.channel.send('<@' + m + '> has earned an extra 300 Kaiba Tokens for getting 10 more standard duels!');
                                }

                            })
                            con.query(`SELECT * FROM custom WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO custom (id, wins, lose) VALUES ('${n}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE custom SET wins = ${loses} WHERE id = '${n}'`;
                                    con.query(sql3, console.log);

                                    if((rows[0].wins + rows[0].lose) % 10 === 0 && rows[0].wins != 0){
                                        con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
            
                                            let sql;
            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
            
                                        })
                                        msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more standard wins!');
                                    }
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 150);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
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