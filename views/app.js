var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

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
  /*  function appendJSON(obj) {

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

  }*/

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});
