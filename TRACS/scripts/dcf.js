/* From parentChild.html */

fileCount = 0;
varCount = 0;

function addNewVariableTrace(containerID) {
    var variableDiv = document.createElement("div");
    variableDiv.setAttribute("class", "variable");
    variableDiv.setAttribute("id", "variable_" + ++varCount);
    variableDiv.setAttribute("title", "Click to edit");

    variableDiv.appendChild(createEditableDiv("name var_name", document.createTextNode("variable")));

    variableDiv.appendChild(addNewVariableEntry());
    document.getElementById(containerID).appendChild(variableDiv);



    console.log("Added variable " + varCount + " @ " + new Date().toLocaleString());
}

function addNewVariableEntry() {
    var entryDiv = document.createElement("div");
    entryDiv.setAttribute("class", "var_entries");
    entryDiv.appendChild(createEditableDiv("variable_entry", document.createTextNode(".")));
    return entryDiv;
}

function addNewFile(containerID, fileClass, fileName, content) {
    var fileDiv = document.createElement("div");
    fileDiv.setAttribute("class", fileClass);
    fileDiv.setAttribute("id", "file_" + ++fileCount);

    // if no filename supplied, use default
    if (fileName == "") { fileName = "untitled.txt"; }

    fileDiv.appendChild(createEditableDiv("name", document.createTextNode(fileName)));
    fileDiv.appendChild(createEditableDiv("", document.createTextNode(content)));

    document.getElementById(containerID).appendChild(fileDiv);

    console.log("Added file " + fileCount + " @ " + new Date().toLocaleString());
}

function addNewEvaluation(containerID) {
    var evalDiv = document.createElement("div");
    evalDiv.setAttribute("class", "evaluation");

    evalDiv.appendChild(createEditableDiv("", document.createTextNode("test")));

    document.getElementById(containerID).appendChild(evalDiv);
}

function createEditableDiv(htmlClass, content) {
    var editableDiv = document.createElement("div");
    editableDiv.setAttribute("contenteditable", "");
    editableDiv.setAttribute("class", htmlClass);

    editableDiv.appendChild(content);
    return editableDiv;
}

function loadDefaultFiles(containerID) {

    addNewFile(containerID, "file in", "<<stdIn>>", "");
    addNewFile(containerID, "file out", "<<stdOut>>", "");
    addNewFile(containerID, "file error", "<<stdErr>>", "");

    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");
    addNewEvaluation("expression_area");

    addNewVariableTrace("trace_area");

/*
    var container = document.getElementById(containerID);
    console.log("Logging children");
    console.log(container.children.length);

    for (var i in container.children.length) {
        if (container.children[i])
    }
*/


}

/*
function addOldDiv(childNo) {
    var oldDiv = document.createElement('div');
    oldDiv.setAttribute("class", "child");
    oldDiv.setAttribute("id", childNo);
    oldDiv.setAttribute("onclick", "removeDiv(" + childNo + ")")
    oldDiv.appendChild(document.createTextNode(childNo));
    document.getElementById("parent").appendChild(oldDiv);

}

function removeDiv(childNo) {
    parent = document.getElementById("parent")
    child = document.getElementById(childNo)
    console.log("Removing node " + child.getAttribute("id") + " at " + new Date().toLocaleString())
    parent.removeChild(child);
}


var count = localStorage.getItem("count")

if (count == null) {
    count = 0
}

var nodes = localStorage.getItem("nodes");

if (nodes == null) {
    nodes = [];
} else {
    nodes = nodes.split(",");
}

function load() {
    for (item in nodes) {
        addOldDiv(nodes[item]);
    }
}

function clear() {
    nodes = []
    count = 0
    localStorage.setItem("nodes", []);
    localStorage.setItem("count", 0);

}
*/