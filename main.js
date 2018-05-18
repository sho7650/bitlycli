#!/usr/bin/env node

'use strict';

const home_dir = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
const request = require('request');
const bitly = require(home_dir + '/.bitly.json');
const long_url = process.argv[process.argv.length - 1];
const pattern = /^https?:\/\//;

if (pattern.test(long_url)) {
  request.get(
    {
      'url': 'https://api-ssl.bitly.com/v3/shorten',
      'qs': {
        'access_token': bitly.access_token,
        'longUrl': long_url
      },
      'json': true
    }, function (err, res, body) {
      console.log(body.data.url);
    }
  );
}