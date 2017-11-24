var express = require("express");
var app = express();

var http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt');

//var router = express(); - changed router to app
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



/////////////////////////////////

//GET requests
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


app.get('/get2/tabledata', function(req, res) {
				//res.writeHead(200, { 'Content-Type': 'application/json' });
				var data = fs.readFileSync('views/test.txt','utf8');
				var parsed2 = JSON.parse(data);
			  res.send(data);
				//console.log(String.fromCharCode.apply(null, parsed));	
				console.log(data);
				console.log(parsed2);
				console.log(String(parsed2));
  res.redirect('back');
});

//POST requests

// POST request to add to JSON & XML files
//MAIN POST ie. /post/json - changed to post3 for testing. Change code back at cleanup
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


app.post('/post6/json', function(req, res) {
 
	var content = req.body.table_content;

	var parsedContent = JSON.parse(content);
	
		fs.writeFile('views/test.json', parsedContent,'utf8', function (err) {
			if (err) {
				// append failed
			} else {
				// done
			}
		})
	res.sendStatus(200)
	
	/* Logging used to test and verify data
	console.log(parsedContent);
	console.log(req.body);
	console.log(req.body.table_content);
	*/
});


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