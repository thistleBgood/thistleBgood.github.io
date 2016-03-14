window.onload = function() {
    add_import_listener('file_input_button', 'file_display_area');
    display_tools("none");
}

function display_tools(displayMode) {
    document.getElementById("ranges_tools").setAttribute("style", "display:" + displayMode);
    document.getElementById("scf_tools").setAttribute("style", "display:" + displayMode);
    document.getElementById("dcf_tools").setAttribute("style", "display:" + displayMode);
}


function add_import_listener (input_button_id, file_display_id) {
    var fileInput = document.getElementById(input_button_id);
    var fileDisplayArea = document.getElementById(file_display_id);

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function(e) {
            console.log("Importing " + file.name);
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
    programNode.appendChild(nameNode);

    for (var i in lines) {
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
}

function load_dcf_tools() {

    // default style for w2ui borders
    var pstyle = "border: 1px solid #dfdfdf; padding: 0.5em;";
    var filesContent = setup_files_content();

    document.getElementById("layout").setAttribute("style","width: 100%; height: 40em");

    var code_area_content = document.getElementById("file_display_area");
    var expressionArea = setup_expression_area();
    var traceArea = setup_trace_area();

    $('#layout').w2layout({
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: "30%", resizable: true, content: code_area_content},
            { type: 'main', style: pstyle, content: traceArea },
            { type: 'preview', size: "50%", resizable: true, style: pstyle, content: expressionArea},
            { type: 'right', size: "30%", resizable: true, content: filesContent }
        ]
    });
    loadDefaultFiles("fileBox");
    document.getElementById("dcf_button").remove();
};

function setup_expression_area() {
    var expressionArea = document.createElement("div");
    expressionArea.setAttribute("id", "expression_area");

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

    traceArea.setAttribute("id", "trace_area");

    return traceArea;

}