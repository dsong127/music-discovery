'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.set("view engine","ejs");

var SpotifyWebApi = require('spotify-web-api-node');
var multer  = require('multer')
const path = require('path');

var image_label;
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

/**********
 *
 *   SPOTIFY AUTHORIZATION
 *
 **********/

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);


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
  var playlistURI = '';

  spotifyApi.getPlaylistsForCategory('party', {
      country: 'US',
      limit : 1,
      offset : 0
    })
  .then(function(data) {
    var obj = {
      image: data.body.playlists.items[0].images[0].url,
      id: data.body.playlists.items[0].id
    };
    return obj;
  })
  .then(function(obj) {
    res.render('player', {uri: obj.id, image: obj.image});
  })
  .catch(function(error){
    console.log('something went wrong');
    console.log(error);
  });
});

app.listen(process.env.PORT || 8080);
