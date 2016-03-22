var https = require('https');
var fs = require('fs');
var mkdirp = require('mkdirp');
var request = require('request');

module.exports = {
  download: download,
  getAllEntries: getAllEntries,
  downloadEntriesFinish: downloadEntriesFinish,
  downloadAllAssets: downloadAllAssets
};

function download(url, dest, callBack) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(); // close() is async, call callBack after close completes.
      if (callBack) callBack('finish');
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    console.log('download error', url);
    if (callBack) callBack('error');
  });
}



function getAllEntries() {
  var config = require('./src/assets/json/contentful.json');
  var hostName = config.production.host;
  var spaceId = config.spaceId;
  var accessToken = config.production.accessToken;
  var path = '/spaces/' + spaceId + '/entries?access_token=' + accessToken + '&limit=1000';
  var url = 'https://' + hostName + path;
  var dest = './src/assets/json/entries.json';
  download(url, dest, downloadEntriesFinish);
}

function downloadEntriesFinish(result) {
  console.log('downloadEntries json', result);
  var entries = require('./src/assets/json/entries.json');
  console.log('entries count', entries.items.length);
  var includesAsset = entries.includes.Asset;
  console.log('includesAsset count', includesAsset.length);
  downloadAllAssets(includesAsset);
}

function downloadAllAssets(assets) {
  for (var i = 0; i < assets.length; i++) {
    var asset = assets[i];
    var assetUrl = asset.fields.file.url.substring(2);

    var url = 'https://' + assetUrl;
    var dest = './src/assets/' + assetUrl;

    //create directory before downloading
    var assetPath = assetUrl.split('/');
    assetPath.pop();
    mkdirp.sync('./src/assets/' + assetPath.join('/'));

    if (fs.existsSync(dest)) {} else {
      console.log('downloadAsset :', dest);
      download(url, dest);
    }
  }
}

getAllEntries();