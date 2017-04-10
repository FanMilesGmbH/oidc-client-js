// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var fs = require('fs');
var open = require('open');
var path = require('path');
var https = require('https');

var port = 5000;
var url = "https://www.example.com:" + port;

const options = {
  key: fs.readFileSync(`${__dirname}/sslcerts/www.example.com.key`),
  cert: fs.readFileSync(`${__dirname}/sslcerts/www.example.com.crt`),
};

var express = require('express');
var app = express();

var static = express.static(path.join(__dirname, 'public'));
app.use(static);

app.get("/oidc-client.js", function(req, res){
    res.sendFile(path.join(__dirname, '../dist/oidc-client.js'));
});

var oidc = require('./oidc.js');
oidc(url, app);

console.log("listening on " + url)
//open(url);

var httpsServer = https.createServer(options, app);

httpsServer.listen(5000);

//app.listen(port);
