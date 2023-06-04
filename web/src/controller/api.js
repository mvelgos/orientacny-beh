const DataService = require('../service/data.service')

module.exports = {
  default: function(req, res) {
    res.send("");
  },
  data: function(req, res) {
    DataService.getResults(res);
  }
}