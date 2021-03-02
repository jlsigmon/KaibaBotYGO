class Deck{
    constructor(cards, price){
        this.cards = cards;
        this.price = price;
    }

    getCards(){
        let list = "";
        for(var i = 0; i < this.cards.length; i++){
            if(i < this.cards.length - 1){
                list += (this.cards[i] + ", ");
            } else{
                list += (this.cards[i]);
            }
        }
        return list;
    }

    getCardList(){
        return this.cards;
    }

    getPrice(){
        return this.price;
    }
}

module.exports = Deck;