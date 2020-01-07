var moment = require('moment');
var db = require('../config/firebase')

var merchantRef = db.ref('merchants');

module.exports = {
    getMerchants: (req, res) => {
        res.render('./pages/merchants', {
            active: 'Merchants'
        })
    }
}