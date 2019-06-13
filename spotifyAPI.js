'use strict';

var SpotifyWebApi = require('spotify-web-api-node');
module.exports.hitSpotify = hitSpotify;

/***************
 *
 * SPOTIFY API STUFF
 *
 ***************/

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const baseURL = 'https://api.spotify.com/v1/';

//
// Auhthorization
//


var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);


function hitSpotify() {


  // Get Something!!!!!
  request.get(APIoptions, function(error, response, body) {
    console.log('REQUEST GETTTTTTING')
    console.log(body);
  });
}




function hitSpotify(type, input) {
  var requestURL = '';
  var token = '';
  if (type === 'search') {
    requestURL = baseURL + 'browse/categories/' + input + '/playlists?limit=1';
  }
  else if (type === 'get') {
    requestURL = baseURL + '/playlists/' + input;
  }

  request.post(authOptions, function(error, response, body).then
    if (!error && response.statusCode === 200) {
      console.log('Auhthorization works bro');
      var token = body.access_token;
    }
    var APIoptions = {
      url: requestURL,
      headers: {
        'Authorization': 'Bearer' + ''
      },
      json: true
    };
  });

  /*request.get(APIoptions, function(error, response, body) {
    console.log('REQUEST GETTTTTTING')
    console.log(body);
  });*/
}
