var socket_io = require('socket.io');
var cards = require('./cards.js')
var io = socket_io();
var socketApi = {};

var deck = cards.getDeck();
//deck = cards.shuffleDeck(deck);

socketApi.io = io;
var clients = [];
var playerOnTurn = 0;
var direction = 1; //1 for forward, -1 for backwards

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
                for(var j = 0;j < 3;j++){
                    playerCards[j] = deck[j];
                }
                deck.splice(0,8);
                const dataToBeSent = {
                    cards: playerCards,
                    msg: 'YOUR CARDS. You are player: '+ i, 
                }
                io.to(clients[i].socket).emit('cards',dataToBeSent);
            }
            if(deck[0].color === "All"){
                io.emit('colorOnBoard',"Red");
            }
            else {
                io.emit('colorOnBoard',deck[0].color);
            }
            io.emit('cardOnBoard',deck[0]);
            if(deck[0].value == "Reverse"){
                io.to(clients[io.engine.clientsCount - 1].socket).emit('turn',`It's your turn!`)
            }
            else if(deck[0].value == "Skip"){
                playerOnTurn++;
                io.to(clients[playerOnTurn].socket).emit('turn',`It's your turn!`)
            }
            else {
                io.to(clients[playerOnTurn].socket).emit('turn',`It's your turn!`)
            }
            deck.splice(0,1);
        }
        else {
            socket.emit('gameStarted','NOT ENOUGH PLAYERS!');
        }
    })

    socket.on('cardOnBoard', (data) => {
        console.log(data);
        io.emit('cardOnBoard',data);
    })

    socket.on('colorOnBoard',(data) => {
        io.emit('colorOnBoard',data);
    })

    socket.on('deck', (data) => {
        socket.emit('card',deck[0]);
        deck.splice(0,1);
    })

    socket.on('direction',(data) => {
        direction = data;
        if(io.engine.clientsCount == 2){
            if(direction == -1){
                playerOnTurn++;
            }
            else if(direction == 1){
                playerOnTurn--;
            }
        }
        io.emit('direction',direction);
    })

    socket.on('plusCards', (data) => {
        if(data === "+2"){
            socket.emit('plusCards',deck[0]);
            socket.emit('plusCards',deck[1]);
            deck.splice(0,2);
        }
        else if(data === "+4"){
            socket.emit('plusCards',deck[0]);
            socket.emit('plusCards',deck[1]);
            socket.emit('plusCards',deck[2]);
            socket.emit('plusCards',deck[3]);
            deck.splice(0,4);
        }
    })

    socket.on('skipNextPlayer', (data) => {
        if(io.engine.clientsCount){
            if(direction == 1){
                playerOnTurn--;
            }
            else {
                playerOnTurn++;
            }
        }
    })

    socket.on('turnOver', (data) => {
        if(direction == 1){
            playerOnTurn++;
            if(playerOnTurn == io.engine.clientsCount){
                playerOnTurn = 0;
            }
            console.log("p: " + playerOnTurn);
            io.to(clients[playerOnTurn].socket).emit('turn',`It's your turn!`);
        }
        else if(direction == -1){
            playerOnTurn--;
            if(playerOnTurn == -1){
                playerOnTurn = io.engine.clientsCount - 1;
            }
            console.log("p: " + playerOnTurn);
            io.to(clients[playerOnTurn].socket).emit('turn',`It's your turn!`);
        }
    })
    socket.on('win', (data) => {
        io.emit('win',data);
    })
});

module.exports = socketApi;