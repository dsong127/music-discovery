const fs = require ('fs');

fs.writeFile(process.env.GCP_KEY_FILE, process.env.GCP_CRED, (ERR) => {
	if (err) throw err;
  console.log('The file has been saved!');
});
