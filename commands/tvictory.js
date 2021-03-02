module.exports = {
    name: 'tvictory',
    description: "Lets users claim the victory for a duel!",
    execute(msg, args, con, coconut, walnut, challengers, challenge, admin){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                let n = challenge[x];
                let m = challengers[x];
                msg.channel.send(msg.author.username + ' claims they have won the wild duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
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
                                    let point = parseInt(rows[0].points + 50);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
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
                            con.query(`SELECT * FROM traditional WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO traditional (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE traditional SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                            })
                            con.query(`SELECT * FROM traditional WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE traditional SET lose = ${loses} WHERE id = '${n}'`;
                                con.query(sql3, console.log);


                            })
                            con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 30);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + ' on the victory! You have been given 50 Kaiba Tokens!');
                            challenge.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an ' + admin + '. Please wait.');
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
                msg.channel.sendMessage(msg.author.username + ' claims they have won the wild duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
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
                                    let point = parseInt(rows[0].points + 50);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                    con.query(sql, console.log);
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
                            con.query(`SELECT * FROM traditional WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO traditional (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE traditional SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                            })
                            con.query(`SELECT * FROM traditional WHERE id = '${n}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO traditional (id, wins, lose) VALUES ('${n}', ${0}, ${1})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE traditional SET wins = ${loses} WHERE id = '${n}'`;
                                    con.query(sql3, console.log);
                                }

                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 30);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut[x].username + ' on the victory! You have been given 50 points!');
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