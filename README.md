# Music Discoveory

Use images to discover new music on Spotify.  
This will uses Google Vision API to identify a related word to an image, and retrieves a playlist from Spotify using that word.  
  
 **Note:** The deployed site won't work as I have depleted my Google Cloud credits.

### Demo

![Alt Text](demo.gif)


## Built With
* HTML/CSS
* [Bootstrap 4.1.0](https://getbootstrap.com/)

* [Node 10.15.3](https://nodejs.org/en/about/)


### Requirements
* [Express](https://expressjs.com/) - For HTTP routing
* [EJS](https://ejs.co/) - JavaScript templating
* [Multer](https://github.com/expressjs/multer) - Middleware for uploading files
* [DropzoneJS](https://www.dropzonejs.com/) - For drag and drop file uploads
* [request](https://github.com/request/request) - For HTTP requests
* [Spotify-Web-Api-Node](https://github.com/thelinmichael/spotify-web-api-node) - Node wrapper for Spotify API
* [Google Cloud Vision API: Node.js Client](https://github.com/googleapis/nodejs-vision#readme) - Gcloud Vision
* [GCloud SDK](https://cloud.google.com/sdk/) - If you want to run locally, or you can use the Google Cloud Platform Console

## Running Locally

To run locally you will need to:  

*  Get Spotify API keys from [Spotify's dashboard](https://developer.spotify.com/dashboard/login)  
*  Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts) and set up your project to use Google Vision API
* `cd` into cloned directory, open `quickStart.sh`, and replace with your Spotify API keys, and path to Google Cloud Vision credential JSON file.
*  `npm install`
*  `./quickStart.sh`
*  Open `Localhost:8080` in your browser

### Deployment

Deployed to [https://music-discover-app.herokuapp.com](https://music-discover-app.herokuapp.com)

### Limitations

The app currently has no navigation. After uploading an image and getting a playlist, user has to manually navigate to the first page by changing the URL. 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details