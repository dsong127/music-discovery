const fs = require('fs');

fs.writeFile('vision_creds.json', process.env.SERVICE_ACCOUNT_JSON, (err) => {
	if (err) throw err;
	console.log('Vision API credentials file has been saved!');
});