const fs = require('fs');
const path = require('path');


fs.writeFile(path.join(__dirname, 'vision_creds.json'), process.env.SERVICE_ACCOUNT_JSON, (err) => {
	if (err) throw err;
	console.log('Vision API credentials file has been saved!');
});