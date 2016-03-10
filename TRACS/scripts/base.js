window.onload = function() {

    add_import_listener('file_input_button', 'file_display_area', 'file_name');
    setup_page ();
}

function setup_page () {

    document.getElementById("ranges_tools").setAttribute("style", "display:none;");
    document.getElementById("scf_tools").setAttribute("style", "display:none;");
    document.getElementById("dcf_tools").setAttribute("style", "display:none;");
}


function add_import_listener (input_button_id, file_display_id, file_name_id) {
    var fileInput = document.getElementById(input_button_id);
    var fileDisplayArea = document.getElementById(file_display_id);

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            console.log("Importing " + file.name);
            preProcess(fileDisplayArea, file.name, reader.result);
        }


        reader.readAsText(file);
    });
}

function preProcess (fileDisplayArea, fileName, text) {

	// clear file display area
    clear_child_nodes(fileDisplayArea);



	
	lines = text.split("\n");
	
	var programNode = document.createElement("div");
	programNode.setAttribute("class", "file program");

    var nameNode = document.createElement("div");
    nameNode.innerText = fileName;
    nameNode.setAttribute("contenteditable", "");
    nameNode.setAttribute("class", "name");
    programNode.appendChild(nameNode);
	
	for (i in lines) {
        console.log(lines[i])
		
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "statement");
		if (lines[i] == "") {
			newNode.innerHTML = "&nbsp;";
		} else {
			newNode.innerText = lines[i];
		}
		newNode.setAttribute("id", "range_" + i)
		programNode.appendChild(newNode);
        programNode.appendChild(document.createElement("br"));
	}
	
	fileDisplayArea.appendChild(programNode)
	//document.getElementById("annotate").removeAttribute("disabled")
	
	localStorage.setItem("count", lines.length)

			document.getElementById("ranges_tools").setAttribute("style", "display: default");
            document.getElementById("scf_tools").setAttribute("style", "display: default");
			document.getElementById("dcf_tools").setAttribute("style", "display: default");
}



// Code to add annotation areas


// Remove all children of a node
function clear_child_nodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}


function load_dcf_tools() {

    // default style for w2ui borders
    var pstyle = "border: 1px solid #dfdfdf; padding: 5px;";
    var filesContent = document.createElement("div")


    filesContent.setAttribute("id", "fileBox");

    var addFile = document.createElement("button");

    addFile.setAttribute("onclick", "addNewFile('fileBox', 'file', '', '')");
    addFile.innerText = "Add file";

    filesContent.appendChild(addFile);

    document.getElementById("layout").setAttribute("style","width: 100%; height: 40em");

    var code_area_content = document.getElementById("file_display_area");
	code_area_content.setAttribute("style", "background: none;");

    var expressionArea = document.createElement("div");

    expressionArea.setAttribute("id", "expression_area");

    var traceArea = document.createElement("div");

    traceArea.setAttribute("id", "trace_area");

	$('#layout').w2layout({
		name: 'layout',
		padding: 4,
		panels: [
			{ type: 'left', size: "30%", resizable: true, style: 'background: rgba(0,0,128,0.25);', content: code_area_content},
			{ type: 'main', style: pstyle, content: traceArea },
			{ type: 'preview', size: "50%", resizable: true, style: pstyle, content: expressionArea},
			{ type: 'right', size: "30%", resizable: true, style: pstyle + 'background: rgba(0,128,0,0.25);' , content: filesContent }
		]
	});

    loadDefaultFiles("fileBox");
	document.getElementById("dcf_button").remove();
};
