module.exports = {
    name: 'rvictory',
    description: "Lets users claim the victory for a ranked duel!",
    execute(msg, args, con, coconut, walnut, challengers, challenge, admin, duelist, five, four, three, two, one, avatar, dreadroot, eraser){
        let author = msg.author.username;
        if(args < 2 || args[1] < 2){
            msg.reply("Please provide the match score! ex. kb!rvictory 2 1");
        }
        else{
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
            switch(args[2]){
                case "0":
                    if (challengers.includes(msg.author.id)) {
                        var x = challengers.indexOf(msg.author.id);
                        var n = challenge[x];
                        var m = challengers[x];
                        var nn = coconut[x];
                        var mm = walnut[x];
                        msg.channel.send(msg.author.username + ' claims they have won the duel, ' + nn.displayName + ' do you confirm?').then(msg => {
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
                                            let point = parseInt(rows[0].points + 400);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                        }

                                    })
                                    if(house !== ''){
                                        con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                            if (err) throw err;
        
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 2);
                                                sql = `UPDATE house SET points = ${point}, userName = '${author}' WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                            } else {
                                                sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 2, '${author}')`;
                                                con.query(sql, console.log);
                                            }
        
                                        })
                                    }
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
                                    con.query(`SELECT * FROM ranked WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;

                                        let sql2;

                                        let win = parseInt(rows[0].wins + 1);
                                        let duel = parseInt(rows[0].duels + 1);
                                        let rat = (win/duel);
                                        sql2 = `UPDATE ranked SET wins = ${win} WHERE id = '${m}'`;
                                        con.query(sql2, console.log);
                                        sql2 = `UPDATE ranked SET duels = ${duel} WHERE id = '${m}'`;
                                        con.query(sql2, console.log);
                                        sql2 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${m}'`;
                                        con.query(sql2, console.log);
                                        if(mm.roles.cache.has(duelist.id)){
                                            let level = parseInt(rows[0].level + 100);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(five.id)){
                                            let level = parseInt(rows[0].level + 90);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(four.id)){
                                            let level = parseInt(rows[0].level + 80);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(three.id)){
                                            let level = parseInt(rows[0].level + 70);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(two.id)){
                                            let level = parseInt(rows[0].level + 60);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(one.id)){
                                            let level = parseInt(rows[0].level + 50);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(rows[0].level < 700 && rows[0].level >= 300){
                                            mm.roles.add(five.id);
                                        }
                                        if(rows[0].level < 1100 && rows[0].level >= 700){
                                            mm.roles.add(four.id);
                                            mm.roles.remove(five.id);
                                        }
                                        if(rows[0].level < 1500 && rows[0].level >= 1100){
                                            mm.roles.add(three.id);
                                            mm.roles.remove(four.id);
                                        }
                                        if(rows[0].level < 2000 && rows[0].level >= 1500){
                                            mm.roles.add(two.id);
                                            mm.roles.remove(three.id);
                                        }
                                        if(rows[0].level >= 2000){
                                            mm.roles.add(one.id);
                                            mm.roles.remove(two.id);
                                        }

                                        if(rows[0].wins % 10 === 0 && rows[0].wins != 0){
                                            let point = parseInt(rows[0].points + 300);
                                            let sql4;
                                            sql4 = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql4, console.log);
                                            msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more ranked wins!');
                                        }
                                    })
                                    con.query(`SELECT * FROM ranked WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;

                                        let sql3;


                                        let loses = parseInt(rows[0].lose + 1);
                                        let duel = parseInt(rows[0].duels + 1);
                                        let rat = (parseInt(rows[0].wins)/duel);

                                        sql3 = `UPDATE ranked SET lose = ${loses} WHERE id = '${n}'`;
                                        con.query(sql3, console.log);
                                        sql3 = `UPDATE ranked SET duels = ${duel} WHERE id = '${n}'`;
                                        con.query(sql3, console.log);
                                        sql3 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${n}'`;
                                        con.query(sql3, console.log);
                                        if(nn.roles.cache.has(duelist.id)){
                                            let level = parseInt(rows[0].level - 30);
                                            if (level < 0){
                                                level = 0;
                                            }
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(five.id)){
                                            let level = parseInt(rows[0].level - 25);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(four.id)){
                                            let level = parseInt(rows[0].level - 20);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(three.id)){
                                            let level = parseInt(rows[0].level - 15);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(two.id)){
                                            let level = parseInt(rows[0].level - 10);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(one.id)){
                                            let level = parseInt(rows[0].level - 10);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(rows[0].level < 300){
                                            nn.roles.remove(five.id);
                                        }
                                        if(rows[0].level < 700 && rows[0].level >= 300){
                                            nn.roles.remove(four.id);
                                            nn.roles.add(five.id);
                                        }
                                        if(rows[0].level < 1100 && rows[0].level >= 1700){
                                            nn.roles.remove(three.id);
                                            nn.roles.add(four.id);
                                        }
                                        if(rows[0].level < 1500 && rows[0].level >= 1100){
                                            nn.roles.remove(two.id);
                                            nn.roles.add(three.id);
                                        }
                                        if(rows[0].level < 2000 && rows[0].level >= 1500){
                                            nn.roles.remove(one.id);
                                            nn.roles.add(two.id);
                                        }

                                    })
                                    con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;

                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 200);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                        }

                                    })
                                    
                                    msg.channel.send('Congrats ' + mm.displayName + ' on the victory! You have been given 400 Kaiba Tokens!');
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
                        var nn = coconut[x];
                        var mm = walnut[x];
                        msg.channel.send(msg.author.username + ' claims they have won the duel, ' + mm.displayName + ' do you confirm?').then(msg => {
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
                                            let point = parseInt(rows[0].points + 400);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql, console.log);
                                        }

                                    })
                                    if(house !== ''){
                                        con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                            if (err) throw err;
        
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 2);
                                                sql = `UPDATE house SET points = ${point}, userName = '${author}' WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            } else {
                                                sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 2, '${author}')`;
                                                con.query(sql, console.log);
                                            }
        
                                        })
                                    }
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
                                    con.query(`SELECT * FROM ranked WHERE id = '${n}'`, (err, rows) => {
                                        if (err) throw err;

                                        let sql2;

                                        let win = parseInt(rows[0].wins + 1);
                                        let duel = parseInt(rows[0].duels + 1);
                                        let rat = (win/duel);
                                        sql2 = `UPDATE ranked SET wins = ${win} WHERE id = '${n}'`;
                                        con.query(sql2, console.log);
                                        sql2 = `UPDATE ranked SET duels = ${duel} WHERE id = '${n}'`;
                                        con.query(sql2, console.log);
                                        sql2 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${n}'`;
                                        con.query(sql2, console.log);

                                        if(nn.roles.cache.has(duelist.id)){
                                            let level = parseInt(rows[0].level + 100);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(five.id)){
                                            let level = parseInt(rows[0].level + 90);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(four.id)){
                                            let level = parseInt(rows[0].level + 80);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(three.id)){
                                            let level = parseInt(rows[0].level + 70);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(two.id)){
                                            let level = parseInt(rows[0].level + 60);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(nn.roles.cache.has(one.id)){
                                            let level = parseInt(rows[0].level + 50);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(rows[0].level < 700 && rows[0].level >= 300){
                                            nn.roles.add(five.id);
                                        }
                                        if(rows[0].level < 1100 && rows[0].level >= 700){
                                            nn.roles.add(four.id);
                                            nn.roles.remove(five.id);
                                        }
                                        if(rows[0].level < 1500 && rows[0].level >= 1100){
                                            nn.roles.add(three.id);
                                            nn.roles.remove(four.id);
                                        }
                                        if(rows[0].level < 2000 && rows[0].level >= 1500){
                                            nn.roles.add(two.id);
                                            nn.roles.remove(three.id);
                                        }
                                        if(rows[0].level >= 2000){
                                            nn.roles.add(one.id);
                                            nn.roles.remove(two.id);
                                        }

                                        if(rows[0].wins % 10 === 0 && rows[0].wins != 0){
                                            let point = parseInt(rows[0].points + 300);
                                            let sql4;
                                            sql4 = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                            con.query(sql4, console.log);
                                            msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more ranked wins!');
                                        }
                                    })
                                    con.query(`SELECT * FROM ranked WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;

                                        let sql3;


                                        let loses = parseInt(rows[0].lose + 1);
                                        let duel = parseInt(rows[0].duels + 1);
                                        let rat = (parseInt(rows[0].wins)/duel);

                                        sql3 = `UPDATE ranked SET lose = ${loses} WHERE id = '${m}'`;
                                        con.query(sql3, console.log);
                                        sql3 = `UPDATE ranked SET duels = ${duel} WHERE id = '${m}'`;
                                        con.query(sql3, console.log);
                                        sql3 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${m}'`;
                                        con.query(sql3, console.log);

                                        if(mm.roles.cache.has(duelist.id)){
                                            let level = parseInt(rows[0].level - 30);
                                            if (level < 0){
                                                level = 0;
                                            }
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(five.id)){
                                            let level = parseInt(rows[0].level - 25);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(four.id)){
                                            let level = parseInt(rows[0].level - 20);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(three.id)){
                                            let level = parseInt(rows[0].level - 15);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(two.id)){
                                            let level = parseInt(rows[0].level - 10);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(mm.roles.cache.has(one.id)){
                                            let level = parseInt(rows[0].level - 10);
                                            sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                        }
                                        if(rows[0].level < 300){
                                            mm.roles.remove(five.id);
                                        }
                                        if(rows[0].level < 700 && rows[0].level >= 300){
                                            mm.roles.remove(four.id);
                                            mm.roles.add(five.id);
                                        }
                                        if(rows[0].level < 1100 && rows[0].level >= 700){
                                            mm.roles.remove(three.id);
                                            mm.roles.add(four.id);
                                        }
                                        if(rows[0].level < 1500 && rows[0].level >= 1100){
                                            mm.roles.remove(two.id);
                                            mm.roles.add(three.id);
                                        }
                                        if(rows[0].level < 2000 && rows[0].level >= 1500){
                                            mm.roles.remove(one.id);
                                            mm.roles.add(two.id);
                                        }
                                    })
                                    con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                        if (err) throw err;

                                        let sql;
                                        
                                        if (rows.length > 0) {
                                            let point = parseInt(rows[0].points + 200);
                                            sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                            con.query(sql, console.log);
                                        }

                                    })

                                    msg.channel.send('Congrats ' + nn.displayName + ' on the victory! You have been given 400 points!');
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
                    break;
                    case "1":
                        if (challengers.includes(msg.author.id)) {
                            var x = challengers.indexOf(msg.author.id);
                            var n = challenge[x];
                            var m = challengers[x];
                            var nn = coconut[x];
                            var mm = walnut[x];
                            msg.channel.send(msg.author.username + ' claims they have won the duel, ' + nn.displayName + ' do you confirm?').then(msg => {
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
                                                let point = parseInt(rows[0].points + 400);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                            }
    
                                        })
                                        if(house !== ''){
                                            con.query(`SELECT * FROM house WHERE userID = '${m}'`, (err, rows) => {
                                                if (err) throw err;
            
                                                let sql;
                                                
                                                if (rows.length > 0) {
                                                    let point = parseInt(rows[0].points + 2);
                                                    sql = `UPDATE house SET points = ${point}, userName = '${author}' WHERE id = '${m}'`;
                                                    con.query(sql, console.log);
                                                } else {
                                                    sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${m}', '${house}', 2, '${author}')`;
                                                    con.query(sql, console.log);
                                                }
            
                                            })
                                        }
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
                                        con.query(`SELECT * FROM ranked WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
    
                                            let sql2;
    
                                            let win = parseInt(rows[0].wins + 1);
                                            let duel = parseInt(rows[0].duels + 1);
                                            let rat = (win/duel);
                                            sql2 = `UPDATE ranked SET wins = ${win} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                            sql2 = `UPDATE ranked SET duels = ${duel} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
                                            sql2 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${m}'`;
                                            con.query(sql2, console.log);
    
                                            if(mm.roles.cache.has(duelist.id)){
                                                let level = parseInt(rows[0].level + 100);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(five.id)){
                                                let level = parseInt(rows[0].level + 90);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(four.id)){
                                                let level = parseInt(rows[0].level + 80);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(three.id)){
                                                let level = parseInt(rows[0].level + 70);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(two.id)){
                                                let level = parseInt(rows[0].level + 60);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(one.id)){
                                                let level = parseInt(rows[0].level + 50);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(rows[0].level < 700 && rows[0].level >= 300){
                                                mm.roles.add(five.id);
                                            }
                                            if(rows[0].level < 1100 && rows[0].level >= 700){
                                                mm.roles.add(four.id);
                                                mm.roles.remove(five.id);
                                            }
                                            if(rows[0].level < 1500 && rows[0].level >= 1100){
                                                mm.roles.add(three.id);
                                                mm.roles.remove(four.id);
                                            }
                                            if(rows[0].level < 2000 && rows[0].level >= 1500){
                                                mm.roles.add(two.id);
                                                mm.roles.remove(three.id);
                                            }
                                            if(rows[0].level >= 2000){
                                                mm.roles.add(one.id);
                                                mm.roles.remove(two.id);
                                            }

                                            if(rows[0].wins % 10 === 0 && rows[0].wins != 0){
                                                let point = parseInt(rows[0].points + 300);
                                                let sql4;
                                                sql4 = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql4, console.log);
                                                msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more ranked wins!');
                                            }
                                        })
                                        con.query(`SELECT * FROM ranked WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
    
                                            let sql3;
    
    
                                            let loses = parseInt(rows[0].lose + 1);
                                            let duel = parseInt(rows[0].duels + 1);
                                            let rat = (parseInt(rows[0].wins)/duel);
    
                                            sql3 = `UPDATE ranked SET lose = ${loses} WHERE id = '${n}'`;
                                            con.query(sql3, console.log);
                                            sql3 = `UPDATE ranked SET duels = ${duel} WHERE id = '${n}'`;
                                            con.query(sql3, console.log);
                                            sql3 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${n}'`;
                                            con.query(sql3, console.log);
    
                                            if(nn.roles.cache.has(duelist.id)){
                                                let level = parseInt(rows[0].level - 30);
                                                if (level < 0){
                                                    level = 0;
                                                }
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(five.id)){
                                                let level = parseInt(rows[0].level - 25);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(four.id)){
                                                let level = parseInt(rows[0].level - 20);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(three.id)){
                                                let level = parseInt(rows[0].level - 15);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(two.id)){
                                                let level = parseInt(rows[0].level - 10);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(one.id)){
                                                let level = parseInt(rows[0].level - 10);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(rows[0].level < 300){
                                                nn.roles.remove(five.id);
                                            }
                                            if(rows[0].level < 700 && rows[0].level >= 300){
                                                nn.roles.remove(four.id);
                                                nn.roles.add(five.id);
                                            }
                                            if(rows[0].level < 1100 && rows[0].level >= 700){
                                                nn.roles.remove(three.id);
                                                nn.roles.add(four.id);
                                            }
                                            if(rows[0].level < 1500 && rows[0].level >= 1100){
                                                nn.roles.remove(two.id);
                                                nn.roles.add(three.id);
                                            }
                                            if(rows[0].level < 2000 && rows[0].level >= 1500){
                                                nn.roles.remove(one.id);
                                                nn.roles.add(two.id);
                                            }
                                        })
                                        con.query(`SELECT * FROM points WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
    
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
    
                                        })
    
                                    
                                        
                                        msg.channel.send('Congrats ' + mm.displayName + ' on the victory! You have been given 400 Kaiba Tokens!');
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
                            var nn = coconut[x];
                            var mm = walnut[x];
                            msg.channel.send(msg.author.username + ' claims they have won the duel, ' + mm.displayName + ' do you confirm?').then(msg => {
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
                                                let point = parseInt(rows[0].points + 400);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql, console.log);
                                            }
    
                                        })
                                        if(house !== ''){
                                            con.query(`SELECT * FROM house WHERE userID = '${n}'`, (err, rows) => {
                                                if (err) throw err;
            
                                                let sql;
                                                
                                                if (rows.length > 0) {
                                                    let point = parseInt(rows[0].points + 2);
                                                    sql = `UPDATE house SET points = ${point}, userName = '${author}' WHERE id = '${n}'`;
                                                    con.query(sql, console.log);
                                                } else {
                                                    sql = `INSERT INTO house (userID, houseName, points, userName) VALUES ('${n}', '${house}', 2, '${author}')`;
                                                    con.query(sql, console.log);
                                                }
            
                                            })
                                        }
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
                                        con.query(`SELECT * FROM ranked WHERE id = '${n}'`, (err, rows) => {
                                            if (err) throw err;
    
                                            let sql2;
    
                                            let win = parseInt(rows[0].wins + 1);
                                            let duel = parseInt(rows[0].duels + 1);
                                            let rat = (win/duel);
                                            sql2 = `UPDATE ranked SET wins = ${win} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                            sql2 = `UPDATE ranked SET duels = ${duel} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                            sql2 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${n}'`;
                                            con.query(sql2, console.log);
                                            
                                            if(nn.roles.cache.has(duelist.id)){
                                                let level = parseInt(rows[0].level + 100);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(five.id)){
                                                let level = parseInt(rows[0].level + 90);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(four.id)){
                                                let level = parseInt(rows[0].level + 80);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(three.id)){
                                                let level = parseInt(rows[0].level + 70);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(two.id)){
                                                let level = parseInt(rows[0].level + 60);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(nn.roles.cache.has(one.id)){
                                                let level = parseInt(rows[0].level + 50);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${n}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(rows[0].level < 700 && rows[0].level >= 300){
                                                nn.roles.add(five.id);
                                            }
                                            if(rows[0].level < 1100 && rows[0].level >= 700){
                                                nn.roles.add(four.id);
                                                nn.roles.remove(five.id);
                                            }
                                            if(rows[0].level < 1500 && rows[0].level >= 1100){
                                                nn.roles.add(three.id);
                                                nn.roles.remove(four.id);
                                            }
                                            if(rows[0].level < 2000 && rows[0].level >= 1500){
                                                nn.roles.add(two.id);
                                                nn.roles.remove(three.id);
                                            }
                                            if(rows[0].level >= 2000){
                                                nn.roles.add(one.id);
                                                nn.roles.remove(two.id);
                                            }

                                            if(rows[0].wins % 10 === 0 && rows[0].wins != 0){
                                                let point = parseInt(rows[0].points + 300);
                                                let sql4;
                                                sql4 = `UPDATE points SET points = ${point} WHERE id = '${n}'`;
                                                con.query(sql4, console.log);
                                                msg.channel.send('They have earned an extra 300 Kaiba Tokens for getting 10 more ranked wins!');
                                            }
                                        })
                                        con.query(`SELECT * FROM ranked WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
    
                                            let sql3;
    
    
                                            let loses = parseInt(rows[0].lose + 1);
                                            let duel = parseInt(rows[0].duels + 1);
                                            let rat = (parseInt(rows[0].wins)/duel);
    
                                            sql3 = `UPDATE ranked SET lose = ${loses} WHERE id = '${m}'`;
                                            con.query(sql3, console.log);
                                            sql3 = `UPDATE ranked SET duels = ${duel} WHERE id = '${m}'`;
                                            con.query(sql3, console.log);
                                            sql3 = `UPDATE ranked SET ratio = ${rat} WHERE id = '${m}'`;
                                            con.query(sql3, console.log);
    
                                            if(mm.roles.cache.has(duelist.id)){
                                                let level = parseInt(rows[0].level - 30);
                                                if (level < 0){
                                                    level = 0;
                                                }
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(five.id)){
                                                let level = parseInt(rows[0].level - 25);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(four.id)){
                                                let level = parseInt(rows[0].level - 20);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(three.id)){
                                                let level = parseInt(rows[0].level - 15);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(two.id)){
                                                let level = parseInt(rows[0].level - 10);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(mm.roles.cache.has(one.id)){
                                                let level = parseInt(rows[0].level - 10);
                                                sql2 = `UPDATE ranked SET level = ${level} WHERE id = '${m}'`;
                                                con.query(sql2, console.log);
                                            }
                                            if(rows[0].level < 300){
                                                mm.roles.remove(five.id);
                                            }
                                            if(rows[0].level < 700 && rows[0].level >= 300){
                                                mm.roles.remove(four.id);
                                                mm.roles.add(five.id);
                                            }
                                            if(rows[0].level < 1100 && rows[0].level >= 700){
                                                mm.roles.remove(three.id);
                                                mm.roles.add(four.id);
                                            }
                                            if(rows[0].level < 1500 && rows[0].level >= 1100){
                                                mm.roles.remove(two.id);
                                                mm.roles.add(three.id);
                                            }
                                            if(rows[0].level < 2000 && rows[0].level >= 1500){
                                                mm.roles.remove(one.id);
                                                mm.roles.add(two.id);
                                            }
                                        })
                                        con.query(`SELECT * FROM points WHERE id = '${m}'`, (err, rows) => {
                                            if (err) throw err;
    
                                            let sql;
                                            
                                            if (rows.length > 0) {
                                                let point = parseInt(rows[0].points + 300);
                                                sql = `UPDATE points SET points = ${point} WHERE id = '${m}'`;
                                                con.query(sql, console.log);
                                            }
    
                                        })
    
                                        
                                        msg.channel.send('Congrats ' + nn.displayName + ' on the victory! You have been given 400 points!');
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
}