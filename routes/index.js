var express = require('express');
var router = express.Router();

const axios = require('axios');

require('dotenv').config()
const env = process.env
const api_key = env.API_KEY

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'hello world !'})
});

router.get('/search', function(req, res) {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  const address = req.query.address;
  axios.get(url, {
    params: {
      address: address,
      key: api_key
    }
  })
  .then(function (response) {
    console.log(response.data.results[0].geometry.location);
    res.json({success: true});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success: false});
  });
});

module.exports = router;
