/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// define redips_init variable
var redipsInit;

// redips initialization
redipsInit = function () {
	
	// reference to the REDIPS.drag library and message line
	var	rd = REDIPS.drag,
		msg = document.getElementById('message');
	// how to display disabled elements
	rd.style.borderDisabled = 'solid';	// border style for disabled element will not be changed (default is dotted)
	rd.style.opacityDisabled = 60;		// disabled elements will have opacity effect
	// initialization
	rd.init();
	// only "smile" can be placed to the marked cell
	rd.mark.exception.d8 = 'smile';
	// prepare handlers
	rd.event.clicked = function () {
		msg.innerHTML = 'Clicked';
	};
	rd.event.dblClicked = function () {
		msg.innerHTML = 'Dblclicked';
	};
	rd.event.moved  = function () {
		msg.innerHTML = 'Moved';
	};
	rd.event.notMoved = function () {
		msg.innerHTML = 'Not moved';
	};
	rd.event.dropped = function () {
		msg.innerHTML = 'Dropped';
	};
	rd.event.switched = function () {
		msg.innerHTML = 'Switched';
	};
	rd.event.clonedEnd1 = function () {
		msg.innerHTML = 'Cloned end1';
	};
	rd.event.clonedEnd2 = function () {
		msg.innerHTML = 'Cloned end2';
	};
	rd.event.notCloned = function () {
		msg.innerHTML = 'Not cloned';
	};
	rd.event.deleted = function (cloned) {
		// if cloned element is directly moved to the trash
		if (cloned) {
			// set id of original element (read from redips property)
			// var id_original = rd.obj.redips.id_original;
			msg.innerHTML = 'Deleted (c)';
		}
		else {
			msg.innerHTML = 'Deleted';
		}
	};
	rd.event.undeleted = function () {
		msg.innerHTML = 'Undeleted';
	};
	rd.event.cloned = function () {
		// display message
		msg.innerHTML = 'Cloned';
		// append 'd' to the element text (Clone -> Cloned)
		rd.obj.innerHTML += 'd';
	};
	rd.event.changed = function () {
		// get target and source position (method returns positions as array)
		var pos = rd.getPosition();
		// display current row and current cell
		msg.innerHTML = 'Changed: ' + pos[1] + ' ' + pos[2];
	};
};

//LOAD FUNCTION
var redips = {};


// redips initialization
redips.init = function () {
	// reference to the REDIPS.drag library
	var	rd = REDIPS.drag;
	// initialization
	rd.init();
	// error handler called if error occured during loading table content
	rd.error.loadContent = function (obj) {
		// display error message (non blocking alert)
		setTimeout(function () {
			alert(obj.message + ' (error type ' + obj.type + ')');
		}, 100);
		// return false on first error and stop further processing
		//return false;
	};
	// set reference to the target table
	redips.targetTable = document.getElementById('myTable');
};


// method called on button1 click
// JSON data is retrieved from server script db_ajax2.html
redips.button1 = function () {
	REDIPS.drag.loadContent(redips.targetTable, 'db_ajax2.html');
};

// method called on button2 click
// JSON data is put as second parameter
redips.button2 = function () {
	REDIPS.drag.loadContent('myTable', [["d6", 0, 1, "green", "B1"], ["d6", 6, 2, "green", "B2"], ["d7", 7, 4, "green", "B3"]]);
};

redips.button3 = function () {
	// prepare JSON data to place to the HTML table
	var data = document.getElementById('textField').value;
	// place content to the table
	REDIPS.drag.loadContent(redips.targetTable, data);
};

// method deletes all DIV elements with redips-drag class name from table with id=myTable
redips.clearTable = function () {
	REDIPS.drag.clearTable('myTable');
};

////////////////////////////////////////////////////////////////////////

// toggles trash_ask parameter defined at the top
function toggleConfirm(chk) {
	if (chk.checked === true) {
		REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
	}
	else {
		REDIPS.drag.trash.question = null;
	}
}


// toggles delete_cloned parameter defined at the top
function toggleDeleteCloned(chk) {
	REDIPS.drag.clone.drop = !chk.checked;
}


// enables / disables dragging
function toggleDragging(chk) {
	REDIPS.drag.enableDrag(chk.checked);
}


// function sets drop_option parameter defined at the top
function setMode(radioButton) {
	REDIPS.drag.dropMode = radioButton.value;
}


// show prepared content for saving
function save(type) {
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
}



/*
 function save(type) {

		var table_content;
		// prepare table content of first table in JSON format or as plain query string (depends on value of "type" variable)
		table_content = REDIPS.drag.saveContent('table1', type);
		
    // Read in a JSON file
    var JSONfile = fs.readFileSync('test.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into player array within the JSON file    
    JSONparsed.player.push(table_content);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('test.json', JSONformated);


  }*/



// add onload event listener
// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redips.init);
}

if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}