'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.set("view engine","ejs");

// business logic
var service = require("./service.js");
// Uploading a file requires this middleware
var multer  = require('multer')
const path = require('path');
const request = require('request');

var image_label;

var client_id = '';
var client_secret = '';

// Authorization options
var authOptions = {
    url: 'https://api.spotify.com/v1/browse/categories/party/playlists?limit=1',
    headers: {
      'Authorization': 'Bearer' + token
    },
    json: true
  };

const multer_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|JPEG|JPG|png|PNG/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
    storage: multer_storage
});

app.get('/', function(req, res) {
  return res.render('index');
});

app.post('/uploads', upload.single('file'), function (req, res, next) {
    res.status(200);

    service.get_tag_data(req.file.filename)
    .then(function(data) {
        image_label = data;
    },
    function(err) {
        console.log(err);
    }).then(function () {
        return res.redirect('/player');
    });
});

// https://developer.spotify.com/dashboard/ for register the application
app.get('/player', function(req, res) {
  var uri = 'test';
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var token = body.access_token;

        var options = {
            url: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX1TEroFz7Oja',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
          };

        request.get(options, function(error, response, body) {
          console.log(body);
        });
      }
      return res.render('player', {uri: uri});
    }
});

app.listen(process.env.PORT || 8080);
