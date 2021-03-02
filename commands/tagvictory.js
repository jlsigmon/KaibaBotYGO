const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'tagvictory',
    description: "Lets users claim the victory for a duel!",
    execute(msg, args, con, coconut1, coconut2, coconut3, walnut, challengers, challenge1, challenge2, challenge3, admin){
            if (challengers.includes(msg.author.id)) {
                var x = challengers.indexOf(msg.author.id);
                let n1 = challenge1[x];
                let n2 = challenge2[x];
                let n3 = challenge3[x];
                let m = challengers[x];
                msg.channel.send(msg.author.username + ' claims their team has won the duel. Does ' + coconut2[x].username + ' or ' + coconut3[x].username + ' confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge2[x] || user.id === challenge3[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge2[x] || user.id === challenge3[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 3000000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 3000000 });

                        agr.on('collect', r => {
                            
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 125);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${m}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE tag SET wins = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                            })

                            con.query(`SELECT * FROM points WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 125);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n1}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${n1}', ${1}, ${0})`
                                } else {

                                    let win = parseInt(rows[0].wins + 1);

                                    sql2 = `UPDATE tag SET wins = ${win} WHERE id = '${n1}'`;
                                    con.query(sql2, console.log);
                                }

                            })

                            con.query(`SELECT * FROM tag WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE advance SET lose = ${loses} WHERE id = '${n2}'`;
                                con.query(sql3, console.log);


                            })
                            con.query(`SELECT * FROM points WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 100);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n2}'`;
                                    con.query(sql, console.log);
                                }

                            })

                            con.query(`SELECT * FROM tag WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;


                                let loses = parseInt(rows[0].lose + 1);

                                sql3 = `UPDATE advance SET lose = ${loses} WHERE id = '${n3}'`;
                                con.query(sql3, console.log);


                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n1}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n2}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n3}'`;
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
                            con.query(`SELECT * FROM points WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 100);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n3}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            
                            msg.channel.send('Congrats ' + walnut[x].username + "'s team on the victory! You have been given 125 Kaiba Tokens!");
                            challenge1.splice(x, 1);
                            challenge2.splice(x, 1);
                            challenge3.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut1.splice(x, 1);
                            coconut2.splice(x, 1);
                            coconut3.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge1.splice(x, 1);
                            challenge2.splice(x, 1);
                            challenge3.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut1.splice(x, 1);
                            coconut2.splice(x, 1);
                            coconut3.splice(x, 1);

                        })
                    })
                })

            } else if (challenge1.includes(msg.author.id)) {
                var x = challenge1.indexOf(msg.author.id);
                let n1 = challenge1[x];
                let n2 = challenge2[x];
                let n3 = challenge3[x];
                let m = challengers[x];
                msg.channel.send(msg.author.username + ' claims their team has won the duel. Does ' + coconut2[x].username + ' or ' + coconut3[x].username + ' confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge2[x] || user.id === challenge3[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge2[x] || user.id === challenge3[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 125);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n2}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM points WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 125);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n3}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE tag SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${n1}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE tag SET lose = ${win} WHERE id = '${n1}'`;
                                    con.query(sql2, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO tag (id, wins, lose) VALUES ('${n2}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE tag SET wins = ${loses} WHERE id = '${n2}'`;
                                    con.query(sql3, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO tag (id, wins, lose) VALUES ('${n3}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE tag SET wins = ${loses} WHERE id = '${n3}'`;
                                    con.query(sql3, console.log);
                                }

                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 100);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n1}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n2}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n3}'`;
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
                            con.query(`SELECT * FROM points WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 100);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n1}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut1[x].username + "'s team on the victory! You have been given 125 Kaiba Tokens!");
                            challenge1.splice(x, 1);
                            challenge2.splice(x, 1);
                            challenge3.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut1.splice(x, 1);
                            coconut2.splice(x, 1);
                            coconut3.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge1.splice(x, 1);
                            challenge2.splice(x, 1);
                            challenge3.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut1.splice(x, 1);
                            coconut2.splice(x, 1);
                            coconut3.splice(x, 1);

                        })
                    })
                })
            } else if (challenge2.includes(msg.author.id)) {
                var x = challenge2.indexOf(msg.author.id);
                let n1 = challenge1[x];
                let n2 = challenge2[x];
                let n3 = challenge3[x];
                let m = challengers[x];
                msg.channel.send(msg.author.username + ' claims their team has won the duel. Does ' + walnut[x].username + ' or ' + coconut1[x].username + ' confirm?').then(msg => {
                    msg.react('✅').then(r => {
                        msg.react('❌')

                        const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge1[x] || user.id === challengers[x];
                        const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge1[x] || user.id === challengers[x];

                        const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                        const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                        agr.on('collect', r => {
                            con.query(`SELECT * FROM points WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 125);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n2}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM points WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 125);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n3}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE tag SET lose = ${win} WHERE id = '${m}'`;
                                    con.query(sql2, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length < 1) {
                                    sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${n1}', ${0}, ${1})`
                                } else {

                                    let win = parseInt(rows[0].lose + 1);

                                    sql2 = `UPDATE tag SET lose = ${win} WHERE id = '${n1}'`;
                                    con.query(sql2, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO tag (id, wins, lose) VALUES ('${n2}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE tag SET wins = ${loses} WHERE id = '${n2}'`;
                                    con.query(sql3, console.log);
                                }

                            })
                            con.query(`SELECT * FROM tag WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;

                                let sql3;

                                if (rows.length < 1) {
                                    sql3 = `INSERT INTO tag (id, wins, lose) VALUES ('${n3}', ${1}, ${0})`
                                } else {

                                    let loses = parseInt(rows[0].wins + 1);

                                    sql3 = `UPDATE tag SET wins = ${loses} WHERE id = '${n3}'`;
                                    con.query(sql3, console.log);
                                }

                            })
                            con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 100);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n1}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n2}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n2}'`;
                                        con.query(sql, console.log);
                                }
                            })
                            con.query(`SELECT * FROM stats WHERE id = '${n3}'`, (err, rows) => {
                                if (err) throw err;
                        
                                let sql;
                        
                                if (rows.length > 0) {
                                    let totalDuels = rows[0].numduels + 1;
                                    sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n3}'`;
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
                            con.query(`SELECT * FROM points WHERE id = '${n1}'`, (err, rows) => {
                                if (err) throw err;

                                let sql;
                                
                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points + 100);
                                    sql = `UPDATE points SET points = ${point} WHERE id = '${n1}'`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send('Congrats ' + coconut2[x].username + "'s team on the victory! You have been given 125 Kaiba Tokens!");
                            challenge1.splice(x, 1);
                            challenge2.splice(x, 1);
                            challenge3.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut1.splice(x, 1);
                            coconut2.splice(x, 1);
                            coconut3.splice(x, 1);
                        })
                        decl.on('collect', r => {
                            msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                            challenge1.splice(x, 1);
                            challenge2.splice(x, 1);
                            challenge3.splice(x, 1);
                            challengers.splice(x, 1);
                            walnut.splice(x, 1);
                            coconut1.splice(x, 1);
                            coconut2.splice(x, 1);
                            coconut3.splice(x, 1);

                        })
                    })
                })
            } else if (challenge3.includes(msg.author.id)) {
                    var x = challenge3.indexOf(msg.author.id);
                    let n1 = challenge1[x];
                    let n2 = challenge2[x];
                    let n3 = challenge3[x];
                    let m = challengers[x];
                    msg.channel.send(msg.author.username + ' claims their team has won the duel. Does ' + walnut[x].username + ' or ' + coconut1[x].username + ' confirm?').then(msg => {
                        msg.react('✅').then(r => {
                            msg.react('❌')
    
                            const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge1[x] || user.id === challengers[x];
                            const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge1[x] || user.id === challengers[x];
    
                            const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                            const decl = msg.createReactionCollector(declFilt, { time: 300000 });
    
                            agr.on('collect', r => {
                                con.query(`SELECT * FROM points WHERE id = '${n2}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql;
    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 125);
                                        sql = `UPDATE points SET points = ${point} WHERE id = '${n2}'`;
                                        con.query(sql, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM points WHERE id = '${n3}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql;
    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 125);
                                        sql = `UPDATE points SET points = ${point} WHERE id = '${n3}'`;
                                        con.query(sql, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM tag WHERE id = '${m}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql2;
    
                                    if (rows.length < 1) {
                                        sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${m}', ${0}, ${1})`
                                    } else {
    
                                        let win = parseInt(rows[0].lose + 1);
    
                                        sql2 = `UPDATE tag SET lose = ${win} WHERE id = '${m}'`;
                                        con.query(sql2, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM tag WHERE id = '${n1}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql2;
    
                                    if (rows.length < 1) {
                                        sql2 = `INSERT INTO tag (id, wins, lose) VALUES ('${n1}', ${0}, ${1})`
                                    } else {
    
                                        let win = parseInt(rows[0].lose + 1);
    
                                        sql2 = `UPDATE tag SET lose = ${win} WHERE id = '${n1}'`;
                                        con.query(sql2, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM tag WHERE id = '${n2}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql3;
    
                                    if (rows.length < 1) {
                                        sql3 = `INSERT INTO tag (id, wins, lose) VALUES ('${n2}', ${1}, ${0})`
                                    } else {
    
                                        let loses = parseInt(rows[0].wins + 1);
    
                                        sql3 = `UPDATE tag SET wins = ${loses} WHERE id = '${n2}'`;
                                        con.query(sql3, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM tag WHERE id = '${n3}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql3;
    
                                    if (rows.length < 1) {
                                        sql3 = `INSERT INTO tag (id, wins, lose) VALUES ('${n3}', ${1}, ${0})`
                                    } else {
    
                                        let loses = parseInt(rows[0].wins + 1);
    
                                        sql3 = `UPDATE tag SET wins = ${loses} WHERE id = '${n3}'`;
                                        con.query(sql3, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 100);
                                        sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                        con.query(sql, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM points WHERE id = '${n1}'`, (err, rows) => {
                                    if (err) throw err;
    
                                    let sql;
                                    
                                    if (rows.length > 0) {
                                        let point = parseInt(rows[0].points + 100);
                                        sql = `UPDATE points SET points = ${point} WHERE id = '${n1}'`;
                                        con.query(sql, console.log);
                                    }
    
                                })
                                con.query(`SELECT * FROM stats WHERE id = '${n1}'`, (err, rows) => {
                                    if (err) throw err;
                            
                                    let sql;
                            
                                    if (rows.length > 0) {
                                        let totalDuels = rows[0].numduels + 1;
                                        sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n1}'`;
                                            con.query(sql, console.log);
                                    }
                                })
                                con.query(`SELECT * FROM stats WHERE id = '${n2}'`, (err, rows) => {
                                    if (err) throw err;
                            
                                    let sql;
                            
                                    if (rows.length > 0) {
                                        let totalDuels = rows[0].numduels + 1;
                                        sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n2}'`;
                                            con.query(sql, console.log);
                                    }
                                })
                                con.query(`SELECT * FROM stats WHERE id = '${n3}'`, (err, rows) => {
                                    if (err) throw err;
                            
                                    let sql;
                            
                                    if (rows.length > 0) {
                                        let totalDuels = rows[0].numduels + 1;
                                        sql = `UPDATE stats SET numduels = ${totalDuels} WHERE id = '${n3}'`;
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
                                msg.channel.send('Congrats ' + coconut3[x].username + "'s team on the victory! You have been given 125 Kaiba Tokens!");
                                challenge1.splice(x, 1);
                                challenge2.splice(x, 1);
                                challenge3.splice(x, 1);
                                challengers.splice(x, 1);
                                walnut.splice(x, 1);
                                coconut1.splice(x, 1);
                                coconut2.splice(x, 1);
                                coconut3.splice(x, 1);
                            })
                            decl.on('collect', r => {
                                msg.channel.send('Fetching an <@&' + admin.id + '>. Please wait.');
                                challenge1.splice(x, 1);
                                challenge2.splice(x, 1);
                                challenge3.splice(x, 1);
                                challengers.splice(x, 1);
                                walnut.splice(x, 1);
                                coconut1.splice(x, 1);
                                coconut2.splice(x, 1);
                                coconut3.splice(x, 1);
    
                            })
                        })
                    })
                }   else {
                msg.reply('You are currently not in a duel!');
            }
    }
}