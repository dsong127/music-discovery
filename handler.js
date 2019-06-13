'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.set("view engine","ejs");



/**************
 *
 *   ROUTES
 *
 *************/

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
    });
});
