class Pack {
    constructor(cards, price, number, name){
        this.cards = cards;
        this.price = price;
        this.number = number;
        this.name = name;
    }

    //chooses random cards from the pack
    //the amount chosen is equal to the number defined in the config
    getRandomCards(){
        let contains = [];
        for(var i = 0; i < this.number; i++){
            let num = Math.floor(Math.random() * this.cards.length);
            contains[i] = this.cards[num];
        }
        return contains;
    }

    //Returns all cards that are in the pack
    getCardList(){
        return this.cards;
    }

    //returns the price of the pack
    getPrice(){
        return this.price;
    }

    //returns the name of the pack
    getName(){
        return this.name;
    }
}

module.exports = Pack;