const path = require('path');
const fs = require('fs');

const express = require('express');
const app = require('express')();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, 'public/MultiShotAdmin/dist')));
const http = require('http').Server(app);
const io = require('socket.io')(http);
const base64Img = require('base64-img');
const ip = require('ip');
io.origins('*:*');

// const {BrowserWindow} = require('electron').remote;
const dialog = require('electron').dialog;


const picBaseDir = `${__dirname}/../../pictures`;

let picturePath = '';

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/MultiShotAdmin/dist/index.html');
});

app.get('/api/iploc', function (req, res) {
    res.send({
        url: `http://${ip.address()}:3000`
    });
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('shot', (data) => {
        io.emit('shot', {
            timestamp: createLocalTimestamp()
        });
    });

    socket.on('loadPic', (data) => {
        convertImgToFile(data, socket.id);
    });

    socket.on('filePath', (data) => {
        selectDirectory(socket);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

function convertImgToFile(data, socketId) {
    base64Img.img(data.imgBase, createFullFilePath(data.timestamp), socketId, (err, filePath) => {
        console.log('filePath', filePath);
        io.emit('filePath', {
            filePath: filePath,
        });
    });
}

function createLocalTimestamp() {
    const date = new Date();

    return `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
}

function createFullFilePath(timestamp) {
    return `${picturePath}/${timestamp}`;
}

function selectDirectory() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (value) => {
        if (value) {
            picturePath = value[0];
        }
    });
}