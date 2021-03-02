
module.exports = {
    name: 'vote',
    description: "Lets admins setup a vote!",
    execute(msg, args, vote, ms){
        if(args.length < 1){
            msg.reply("Please provide a time and card name!");
        }
        let time = args[1];
        if(args.length < 2){
            msg.reply("Please provide a card name!");
        }
        let card = '';
        for(let i = 2; i < args.length; i++){
            card += args[i] + ' ';
        }
        msg.react('681245623374053449').then(r => {
            msg.react('681245623323852923').then(r =>{
                msg.react('681245623625711723').then(r =>{
                    msg.react('681245623600676873');
                    msg.channel.send(vote + ', The voting for ' + card + 'has begun! The vote will end in ' + args[1]);
                });
            });
        });

        setTimeout(function () {
            msg.channel.send(vote + ', The voting for ' + card + ' has ended!');
        }, ms(time));
    }
}