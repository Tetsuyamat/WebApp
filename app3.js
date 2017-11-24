var express = require("express");
var app = express();

var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

global.document = new JSDOM(webapp-tetsuyamat301769.codeanyapp.com).window.document;

var http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt');


eval(fs.readFileSync('redips-drag-min.js')+'');
//var router = express(); - changed router to app
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
/////////////////////////////////
// GET request to dislay index.html located inside /views folder
app.get('/', function(req, res) {
  res.render('squads');
});
/*	if (req.url === "squads") {
    res.render('squads');
  }

  // 404'd!
  else {
   res.render('index');
  }*/

// HTML produced by XSL Transformation
app.get('/get/html', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var docSource = fs.readFileSync('Squad.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('Squad.xsl', 'utf8');
    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource); 
    var result = stylesheet.apply(doc); 
    res.end(result.toString()); 
});

// POST request to add to JSON & XML files
app.post('/post3/json', function(req, res) {
  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {
    // Read in a JSON file
    var JSONfile = fs.readFileSync('Squad.json', 'utf8');
    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);
    // Add a new record into player array within the JSON file    
    JSONparsed.player.push(obj);
    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);
    // Write the updated JSON file back to the system 
    fs.writeFileSync('Squad.json', JSONformated);
    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("squad", JSON.parse(JSONformated));
    // Write the resulting XML back to the system
    fs.writeFileSync('Squad.xml', XMLformated);
  }
  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
});


//TEST POST SUBMIT 
/*app.post('/post2/json', function(req, res) {
   // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {
    // Read in a JSON file
    var JSONfile = fs.readFileSync('test.json', 'utf8');
    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);
    // Add a new record into player array within the JSON file    
    JSONparsed.player.push(obj);
    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);
    // Write the updated JSON file back to the system 
    fs.writeFileSync('test.json', JSONformated);
    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("squad", JSON.parse(JSONformated));
    // Write the resulting XML back to the system
    fs.writeFileSync('test.xml', XMLformated);
  }
  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
});*/


//TEST POST SUBMIT 
app.post('/post2/json', function(req, res) {
	// define table_content variable
	var table_content;
	// prepare table content of first table in JSON format or as plain query string (depends on value of "type" variable)
	table_content = REDIPS.drag.saveContent('table1');
	// if content doesn't exist
	if (!table_content) {
		alert('Table is empty!');
	}
	else {
		var table = $('#table1').tableToJSON();
			console.log(table);
			alert(JSON.stringify(table));  
	}

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
});

/* ELSE IF FOR POST2
	else if (type === 'json') {
			var table = $('#table1').tableToJSON();
			console.log(table);
			alert(JSON.stringify(table));  
	}*/

/*function save(type) {
	// define table_content variable
	var table_content;
	// prepare table content of first table in JSON format or as plain query string (depends on value of "type" variable)
	table_content = REDIPS.drag.saveContent('table1', type);
	// if content doesn't exist
	if (!table_content) {
		alert('Table is empty!');
	}
	// display query string
	else if (type === 'json') {
			var table = $('#table1').tableToJSON();
			console.log(table);
			alert(JSON.stringify(table));  
	}
	else {
		//window.open('/my/multiple-parameters.php?' + table_content, 'Mypop', 'width=350,height=160,scrollbars=yes');
		window.open('multiple-parameters.php?' + table_content, 'Mypop', 'width=360,height=260,scrollbars=yes');
	}
}*/







/*
Copyright (c) 2008-2017, www.redips.net All rights reserved.
Code licensed under the BSD License: http://www.redips.net/license/
http://www.redips.net/javascript/drag-and-drop-table-content/
Version 5.2.4
Apr 16, 2017.
*/







//Multiple page functions
app.get("/squads", function(request, response) {
  response.render('squads');
});



app.get("*", function(request, response) {
  response.end("404!");
});

//Start the server
http.createServer(app).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log("Server listening at");
});




/* ORIGINAL TEST CODE - DELETE AT SOME POINT
var http = require("http");

http.createServer(function(req, res) {
  // Homepage
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the homepage!");
  }

  // About page
  else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the about page!");
  }

  // 404'd!
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 error! File not found.");
  }
}).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log("Server listening at");
});



//1337, "localhost");

/* 
// Require what we need
var http = require("http");

// Build the server

var app = http.createServer(function(request, response) {
  // Build the answer
  var answer = "";
  answer += "Request URL: " + request.url + "\n";
  answer += "Request type: " + request.method + "\n";
  answer += "Request headers: " + JSON.stringify(request.headers) + "\n";

  // Send answer
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(answer);
});


// Start that server, added port 3000 etc 
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = app.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

/*1337, "localhost");
console.log("Server running at http://localhost:1337/");

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});*/