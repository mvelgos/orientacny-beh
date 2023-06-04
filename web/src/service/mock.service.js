const fs = require('fs')
const path = require('path');

module.exports = {
	query: () => JSON.parse(fs.readFileSync(path.join(__dirname, '../data/mock.export.json')))
}