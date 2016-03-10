/* From parentChild.html */

fileCount = 0;
varCount = 0;

function addNewVariableTrace(containerID) {
    var variableDiv = document.createElement("div");
    variableDiv.setAttribute("class", "variable");
    variableDiv.setAttribute("id", "variable_" + ++varCount);

    variableDiv.appendChild(createEditableDiv("name var_name", document.createTextNode("variable")));

    var entryDiv = document.createElement("div");
    entryDiv.setAttribute("class", "var_entries");


    entryDiv.appendChild(createEditableDiv("variable_entry", document.createTextNode(".")));
    variableDiv.appendChild(entryDiv);
    document.getElementById(containerID).appendChild(variableDiv);



    console.log("Added variable " + varCount + " @ " + new Date().toLocaleString());
}

function addNewFile(containerID, fileClass, fileName, content) {
    var fileDiv = document.createElement("div");
    fileDiv.setAttribute("class", fileClass);
    fileDiv.setAttribute("id", "file_" + ++fileCount);

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

function addNewDiv() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute("class", "child");
    newDiv.setAttribute("id", "file" + ++count);
    //newDiv.setAttribute("onclick", "removeDiv(" + count + ")")
    newDiv.appendChild(document.createTextNode(count));
    document.getElementById("parent").appendChild(newDiv);
    console.log("Added new node " + count + " at " + new Date().toLocaleString());
    nodes.push(count)
    localStorage.setItem("count", count)
    localStorage.setItem("nodes", nodes)
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