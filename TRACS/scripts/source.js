var newACS = new ACS();

window.onload = function() {
    add_import_listener('file_input_button', 'file_display_area');
    display_tools("none");
}

function display_tools(displayMode) {
    document.getElementById("ranges_tools").setAttribute("style", "display:" + displayMode);
    document.getElementById("scf_tools").setAttribute("style", "display:" + displayMode);
    document.getElementById("dcf_tools").setAttribute("style", "display:" + displayMode);
    document.getElementById("create").setAttribute("style", "display:" + displayMode);
}


function add_import_listener (input_button_id, file_display_id) {
    var fileInput = document.getElementById(input_button_id);
    var fileDisplayArea = document.getElementById(file_display_id);

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.readAsText(file);

        makeDownloadFile();

        reader.onload = function(e) {
            //console.log("Importing " + file.name);
            preProcess(fileDisplayArea, file.name, reader.result);
        }
    });
}

function preProcess (fileDisplayArea, fileName, text) {


    clear_child_nodes(fileDisplayArea);
    setup_program_node(fileDisplayArea, fileName, text);
    display_tools("default");
}

// Remove all children of a node
function clear_child_nodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}


function setup_program_node(fileDisplayArea, fileName, text) {
    var lines = text.split("\n");
    var programNode = document.createElement("div");
    programNode.setAttribute("class", "program file");

    var nameNode = document.createElement("div");
    nameNode.innerText = fileName;
    nameNode.setAttribute("contenteditable", "");
    nameNode.setAttribute("class", "name");
    nameNode.setAttribute("id", "ACS_filename")
    nameNode.setAttribute("title", "Click to edit");
    programNode.appendChild(nameNode);

    newACS.setupBase(nameNode, text);

    for (var i in lines) {
        create_initial_range_node(programNode, lines[i], i);
    }

    fileDisplayArea.appendChild(programNode)
}

function create_initial_range_node(programNode, content, rangeID) {
    var newNode = document.createElement("span");
    newNode.setAttribute("id", "range_" + rangeID)
    newNode.setAttribute("class", "statement");

    if (content == "") {
        // Added so that lines actually appear. Without this, they collapse into nothing.
        newNode.innerHTML = "&nbsp;";
    } else {
        newNode.innerText = content;
    }

    programNode.appendChild(newNode);
    // Add "newline" element
    programNode.appendChild(document.createElement("br"));
}

function load_dcf_tools() {

    // default style for w2ui borders
    var pstyle = "border: 1px solid #dfdfdf;";
    var filesContent = setup_files_content();

    document.getElementById("layout").setAttribute("style","width: 100%; height: 40em");

    var code_area_content = document.getElementById("file_display_area");
    var expressionArea = setup_expression_area();
    var traceArea = setup_trace_area();

    $('#layout').w2layout({
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', style: pstyle, size: "30%", resizable: true, content: code_area_content},
            { type: 'main', style: pstyle, content: traceArea },
            { type: 'preview', style: pstyle, size: "50%", resizable: true, style: pstyle + "padding: 0.5em;", content: expressionArea},
            { type: 'right', style: pstyle, size: "30%", resizable: true, content: filesContent }
        ]
    });
    loadDefaultFiles("fileBox");
    document.getElementById("dcf_button").remove();
};

function setup_expression_area() {
    var expressionArea = document.createElement("div");
    expressionArea.setAttribute("id", "expression_area");

    var addExpression = document.createElement("button");

    addExpression.setAttribute("onclick", "addNewEvaluation('expression_area')");
    addExpression.innerText = "Add calculation"

    expressionArea.appendChild(addExpression);
    expressionArea.appendChild(document.createElement("br"));

    return expressionArea;
}

function setup_files_content() {
    var filesContent = document.createElement("div");

    filesContent.setAttribute("id", "fileBox");
    filesContent.setAttribute("style", 'background: rgba(0,128,0,0.25);padding:0.5em;');

    var addFile = document.createElement("button");

    addFile.setAttribute("onclick", "addNewFile('fileBox', 'file', '', '')");
    addFile.innerText = "Add file";

    filesContent.appendChild(addFile);

    return filesContent;
}

function setup_trace_area() {
    var traceArea = document.createElement("div");
    traceArea.setAttribute("style", 'background: rgba(255,0,0,0.25);padding:0.5em;');
    traceArea.setAttribute("id", "trace_area");

    var addTrace = document.createElement("button");

    addTrace.setAttribute("onclick", "addNewVariableTrace('trace_area')");
    addTrace.innerText = "Add variable";

    traceArea.appendChild(addTrace);

    return traceArea;
}


// adapted from http://jsfiddle.net/uselesscode/qm5ag/
function makeDownloadFile () {
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        };


    var create = document.getElementById('create');

    create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(newACS.download());
        link.download = newACS.getName() + ".acs";
        link.style.display = 'block';
    }, false);
};



