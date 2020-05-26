# Card-Game-Uno
Implementing UNO in MEAN using socket.io

## Setup
If you want to run this locally you need to have this installed:
- MongoDB
- NodeJS
- Angular

## Install locally
 - Clone the project
 - Open project terminal and write the following:

 ```
    cd server
    npm install
    cd ..
    cd client
    npm install
 ```

## Starting the game
Navigate to MongoDB installation folder and start mongod.exe
   #### Starting the game on localhost
   - Client -> ``` ng serve --open ```
   - Server -> ``` npm start ```
   #### Starting the game on local network
   - Found out your ip:
      - ``` ipconfig ``` (Windows)
      - ``` ip addr show ``` (Linux)
   - Client -> ``` ng serve --host YOUR_IP_ADDRESS ```
   - Server -> ``` npm start ```