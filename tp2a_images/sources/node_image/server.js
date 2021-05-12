'use strict';

const express = require('express');
const os = require("os");

const app = express();
app.get('/', function (req, res) {
	  res.send('Hello from ' + os.hostname());
});


app.listen(8080);
