var io = require('socket.io').listen(4567);
console.log("app starting");

io.sockets.on('connection', function(socket){
	socket.on('join', function(data){
		socket.broadcast.emit('userJoined', data);
		socket.username = data.username;
                console.log(data.username + " joined");
	});

	socket.on('message', function(data, done){
		socket.broadcast.emit('message', {username: socket.username, data:data});
		done('ack');
                console.log(socket.username + " messaged");
	});

	socket.on('disconnect', function(){
		socket.broadcast.emit('userDisconnect', {username: socket.username});
                console.log(socket.username + " disconnected");
	});
});
