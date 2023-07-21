const { Client } = require("pg");
const config = require('../config/config');

const postgresql = new Client(config.credentials);
postgresql.connect();

const resultsQuery = config.env === 'production' 
	 ? "SELECT json_agg(t) FROM public.getResults('"+config.race.id+"', '"+config.race.catetgories+"', "+config.race.stageId+") t"
	: "SELECT * FROM results" // mocked data on my local
	//console.log(resultsQuery);
	
module.exports = {
	getResults: (res) => postgresql.query(resultsQuery, function(err, results){
		if(err){ 
			console.log(err);
		} else {
			res.send(results.rows[0].json_agg);
		}
	})
}