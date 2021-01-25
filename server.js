var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));              //open public-folder bij starten van host op localhost:3000
console.log("My socket server is running");


//socket.io toegevoegd
var socket = require('socket.io');
var io = socket(server); 

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection: '+ socket.id);

 
    socket.on('pose', poseMsg);
    function poseMsg(data){
        console.log(data);
    }


    

}