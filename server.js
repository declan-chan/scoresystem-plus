'use strict';
const path = require('path');
const express = require('express');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

const port = process.env.PORT || 80;
const app = express();
const pictureSuffix = {
  "image/jpeg": '.jpg',
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'pictures/'));
  },
  filename: function (req, file, cb) {
    cb(null, req.body.categoryName + '-' + req.body.timeSuffix + pictureSuffix[file.mimetype]);
  }
});
function fileFilter (req, file, cb) {
  if (req.body && req.body.categoryName && req.body.timeSuffix) {
    cb(null, true);
  } else {
    cb(new Error('I don\'t have a clue! Not enough post params.'))
  }
}
var upload = multer({ storage: storage, fileFilter: fileFilter});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else  next();
});

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/pictures/*', function response(req, res) {
  var picName = req.params[0];
  if (!picName) res.send('illegal picName');
  res.sendFile(path.join(__dirname, 'pictures/' + picName));
});
// const SocketIo = require('socket.io');
app.post('/', upload.any(), function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  res.send('ok');
});


app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`==> 🌎 Listening on port ${port}`);
});

// const io = new SocketIo(server, {path: '/path/chat'});
// io.on('connection', function (connection) {  
//     console.log((new Date()) + ' Connection from origin ' + connection.id + '.');  
    
//   });
