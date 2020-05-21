var socket_io = require('socket.io');
var cards = require('./cards.js')
var io = socket_io();
var socketApi = {};

var deck = cards.getDeck();
//deck = cards.shuffleDeck(deck);

socketApi.io = io;
var clients = [];
var playerOnTurn = 0;

io.on('connection', function(socket){
    var user = { userID: socket.request._query['userID'] , socket: socket.id}
    clients.push(user);
    console.log('A user connected. ' + io.engine.clientsCount + ' users connected.');
    //User connected says hello and we return hello
    socket.on('hello', (data) => {
        console.log(data);
        socket.emit('hello','Hello user '+user.userID);
    })
    //User disconnected => removed from clients
    socket.on('disconnect', function(){
        console.log("user disconnected");
        for(var i = 0;i < clients.length;i++){
            if(socket.id == clients[i].socket){
                clients.splice(i, 1);
                break;
            }
        }
    });
    //User has requested game start
    socket.on('startGame', (data) => {
        if(io.engine.clientsCount >= 1){
            deck = cards.getDeck();
            deck = cards.shuffleDeck(deck);
            playerOnTurn = 0;
            io.emit('gameStarted','GAME STARTED!!!');
            for(var i = 0; i < io.engine.clientsCount;i++){
                var playerCards = [];
                for(var j = 0;j < 8;j++){
                    playerCards[j] = deck[j];
                }
                deck.splice(0,8);
                const dataToBeSent = {
                    cards: playerCards,
                    msg: 'YOUR CARDS. You are player: '+ i, 
                }
                io.to(clients[i].socket).emit('cards',dataToBeSent);
            }
            io.emit('cardOnBoard',deck[0]);
            deck.splice(0,1);
            io.to(clients[playerOnTurn].socket).emit('turn',`It's your turn!`)
        }
        else {
            socket.emit('gameStarted','NOT ENOUGH PLAYERS!');
        }
    })

    socket.on('cardOnBoard', (data) => {
        io.emit('cardOnBoard',data);
    })

    socket.on('deck', (data) => {
        socket.emit('card',deck[0]);
        deck.splice(0,1);
    })

    socket.on('turnOver', (data) => {
        playerOnTurn++;
        if(playerOnTurn == io.engine.clientsCount){
            playerOnTurn = 0;
        }
        // console.log(playerOnTurn);
        // console.log(clients[playerOnTurn].socket);
        io.to(clients[playerOnTurn].socket).emit('turn',`It's your turn!`);
    })
});

module.exports = socketApi;