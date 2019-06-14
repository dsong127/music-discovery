'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.set("view engine","ejs");

var SpotifyWebApi = require('spotify-web-api-node');
var multer  = require('multer')
const path = require('path');

var dataObj;
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

/**********************************
 *
 *   SPOTIFY AUTHORIZATION
 *
 ********************************/

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

/**********************************
 *
 *   GOOGLE VISION
 *
 ********************************/

 const vision = require('@google-cloud/vision');
 const client = new vision.ImageAnnotatorClient();

 async function getEntities(fileName) {
  // Performs label detection on the local file
  const [result] = await client.webDetection('uploads/' + fileName);
  const webDetection = result.webDetection;
  if (webDetection.webEntities.length) {
    console.log(`Web entities found: ${webDetection.webEntities.length}`);
    // For debugging
    webDetection.webEntities.forEach(webEntity => {
      console.log(`  Description: ${webEntity.description}`);
    });
  }
  return webDetection.webEntities[0].description;
}

/*********************************
 *
 *   Uploading files
 *
 *********************************/

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

/******************************
 *
 *   ROUTES
 *
 ******************************/

app.get('/', function(req, res) {
  res.status(200);
  return res.render('index');
});

app.post('/uploads', upload.single('file'), function (req, res, next) {
    res.status(200);

    // Get entity using Gcloud vision API
    getEntities(req.file.filename)
      .then(function(entity){
        // Search playlists using image entity
        spotifyApi.searchPlaylists(entity, { limit : 5, offset : 1 })
        .then(function(data) {
          var obj = {
            image: data.body.playlists.items[0].images[0].url,
            id: data.body.playlists.items[0].id
          };
          //Global object with playlist id and album cover
          dataObj = obj;
        })
        .then(function(){
          console.log('this should only get called when we have obj data');
          res.redirect('/player');
        })
        .catch(function(error){
          console.log('Something went wrong');
          console.log(error);
        });
      })
      .catch(function(error){
        console.log('error getting entities');
        console.log(error);
      });
});

app.get('/player', function(req, res) {
  res.status(200);
  res.render('player', {uri: dataObj.id, image: dataObj.image});
});

app.listen(process.env.PORT || 8080);
