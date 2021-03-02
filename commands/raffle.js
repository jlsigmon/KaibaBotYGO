module.exports = {
    name: 'raffle',
    description: "Lets admins setup a raffle!",
    execute(msg, args, ms, admin, con, helper){
        if(msg.member.roles.cache.has(admin.id) || msg.member.roles.cache.has(helper.id)){
            if(args.length < 1){
                msg.reply("Please provide a time and card name!");
            }
            let time = args[1];
            if(args.length < 2){
                msg.reply("Please provide a buy in price!");
            }
            let price = args[2];
            if(args.length < 3){
                msg.reply("Please provide a number of winners!");
            }
            var numWin = args[3];
            if(args.length < 4){
                msg.reply("Please provide a item to be raffled!");
            }
            let card = '';
            for(let i = 4; i < args.length; i++){
                if(i === args.lenght - 1){
                    card += args[i];
                } else {
                    card += args[i] + ' ';
                }
            }
            
            msg.channel.send('A raffle for ' + card + 'has begun! The raffle will end in ' + args[1]);
            msg.channel.send('The buy in amount is ' + price + ' tokens. The amount of winners to be picked is ' + numWin + '! Use k!rafflejoin to join the raffle!')

            con.query(`SELECT * FROM currentraffle`, (err, rows) => {
                if (err) throw err;
        
                let sql;
                
                let day = parseInt(Date.now());
        
                //if id not found, adds them to the table
                if (rows.length < 1) {
                    sql = `INSERT INTO currentraffle (raffle, time, start, price, numwin) VALUES ('${card}', '${time}', '${day}', ${price}, ${numWin})`
                    con.query(sql, console.log);
                }
        
        
            })
            setTimeout(function () {
                msg.channel.send('The raffle for ' + card + 'has ended!');
                var pastwinner = '';
                for(i = 0; i < numWin; i++){
                    con.query(`SELECT * FROM raffle`, (err, rows) => {
                        if (err) throw err;
                        let sql;
                        if (rows.length > 0) {
                        
                            let winner = rows[getRndInteger(0,rows.length)].id;
                            if(pastwinner === winner){
                                while(pastwinner === winner){
                                    winner = rows[getRndInteger(0,rows.length)].id;
                                }
                            }
                            pastwinner = winner;
                            msg.channel.send('<@' + winner + '> has won the raffle for ' + card + '!');
                            sql = `DELETE FROM raffle WHERE id= '${winner}'`
                            con.query(sql, console.log);

                        }
                    })
                }
                con.query(`TRUNCATE raffle`);
                con.query(`TRUNCATE currentraffle`);
            }, ms(time));
        } else {
            msg.reply('You do not have permission to start a raffle!');
        }
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}