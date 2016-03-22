set -e
npm install
bower install --config.interactive=false

echo "start unit-test"
gulp test

#echo "start e2e test, jenkins user should have an active VNC session, or the test will FAIL."
# gulp protractor

gulp clean && gulp build
cd cordova
echo "remove cordova platforms"
rm -rf platforms/*
rm -rf plugins/*
echo "add cordova platform"
cordova platform add ios
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add https://github.com/apache/cordova-plugins.git#master:wkwebview-engine-localhost
