const fs = require('fs');

fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.SERVICE_ACCOUNT_JSON, (err) => {
	if (err) throw err;
	console.log('Vision API credentials file has been saved!');
});