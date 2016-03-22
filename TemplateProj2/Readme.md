
IPA Mobile App
=====================

This repo is the source code of mobile app for IPA project.

## Dependence

### Check dependence

```bash
which gulp && which bower && which cordova && which ionic
```

You should see four results like below

```bash
/Users/jzl/.npm-packages/bin/gulp
/Users/jzl/.npm-packages/bin/bower
/Users/jzl/.npm-packages/bin/cordova
/Users/jzl/.npm-packages/bin/ionic
```
### Install dependence

If some item are missing, install them via `npm` command.

```bash
npm install -g gulp bower cordova ionic
```

## Mobile App

### Project initiate

```bash
npm install && bower install
```

### Test on browser

```bash
gulp clean && gulp serve
```

### Build cordova

```bash
./build.sh
```

## Directory structure

[Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)




