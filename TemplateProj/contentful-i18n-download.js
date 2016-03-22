var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');
var request = require('request');

module.exports = {
  getAllLocales: getAllLocales,
}

function getAllLocales() {
  var config = require('./src/assets/json/contentful-i18n.json');
  var hostName = config.production.host;
  var spaceId = config.spaceId;
  var accessToken = config.production.accessToken;
  var supportedLocales = config.supportedLocales;
  var path = '/spaces/' + spaceId + '/entries?access_token=' + accessToken + '&limit=1000';
  var url = 'https://' + hostName + path;
  var dest = 'src/assets/json/i18n.entries';
  downloadEntriesForLocaleList(supportedLocales, url, dest);
}


function downloadEntriesForLocaleList(supportedLocales, mainUrl, mainDest) {

  for (var i = 0; i < supportedLocales.length; i++) {
    console.log("Downloading Content for Language >>> ", supportedLocales[i].language);
    var locale = supportedLocales[i].locale;
    var url = mainUrl + '&locale=' + locale;
    var dest = mainDest + '/entries-' + locale + '.json';
    downloadLocale(url, dest);
  }
}

function downloadLocale(url, dest) {
  console.log("Writing to Destination >> ", dest);
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest);
    console.log('download error', url);
  });
}

getAllLocales();