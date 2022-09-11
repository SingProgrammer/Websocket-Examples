var app = require('express')();


const querystring = require('querystring');
const bodyParser = require('body-parser');

var http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
http.listen(3000, function(){
      console.log('listening on *:3000');
});



io.on('connection',function(client){
    console.log('Client connected..');
    client.on('join',function(data){
        console.log(data);
    });


	
	setInterval(function() {
        var currentDate = new Date();
        io.sockets.emit('clock',{currentDate:currentDate});

    },1000);
	
	client.on('disconnect', () => {
    console.log('user disconnected');
  });

  

});


app.post('/api/send', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    
    const payload = req.body
    res.json(payload)
	
	console.log(req.headers);
    console.log(req.body);
    io.sockets.emit('send',req.body);
});









