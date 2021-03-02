const links = ["https://duelingnexus.com/game/NA-8CTDGD0DI1J6","https://duelingnexus.com/game/NA-DC27RX0DI1J6","https://duelingnexus.com/game/NA-D9RVBX0DI1J6","https://duelingnexus.com/game/NA-RSIXY50DI1J6","https://duelingnexus.com/game/NA-0XDQOT0DI1J6"];
module.exports = {
    name: 'taglink',
    description: "Command for users to buy a pack",
    execute(msg){
        let num = Math.floor(Math.random() * links.length);
        msg.reply(links[num]);
    }
}