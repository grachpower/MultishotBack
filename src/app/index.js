var app = require('express')();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var http = require('http').Server(app);
var io = require('socket.io')(http);
var base64Img = require('base64-img');
io.origins('*:*')

const picBaseDir = `${__dirname}/../../pictures`;

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  res.send('wow wow wow');
});

io.on('connection', function(socket){
  console.log('a user connected');

  	socket.on('shot', (data) => {
		io.emit('shot', {
			timestamp: createLocalTimestamp()
		});
	})

	socket.on('loadPic', (data) => {
		convertImgToFile(data, socket.id);
	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function convertImgToFile(data, socketId) {
	base64Img.img(data.imgBase, createFullFilePath(data.timestamp), socketId, (err, filePath) => {
		console.log('filePath', filePath);
	});
};

function createLocalTimestamp() {
	const date = new Date();

	return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
}

function createFullFilePath(timestamp) {
	return `${picBaseDir}/${timestamp}`;
}