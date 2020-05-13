var colors = ["Red" , "Green", "Blue" , "Yellow"];
var values = ["0","1","2","3","4","5","6","7","8","9","+2","Skip","Reverse"];

const functions = {
    getDeck: () => {
        var deck = new Array();

        for(var i = 0;i <colors.length;i++){
            for(var j = 0;j < values.length;j++){
                var card = {value: values[j], color: colors[i]};
			    deck.push(card);
            }
        }
        for(var i = 0; i < 2;i++){
            var cardColorChange = {value:"Colorchange", color:"All" };
            var cardPlusFour = {value:"+4", color:"All" }
            deck.push(cardColorChange);
            deck.push(cardPlusFour);
        }
        return deck;
    },
    shuffleDeck: (deck) => {
        for (var i = 0; i < 1000; i++) {
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
        return deck;
    }
}

module.exports = functions;
