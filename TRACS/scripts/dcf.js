/* From parentChild.html */

function TRACSfile (fileID, nameElement, contentsElement) {
    this.fileID = fileID;
    this.nameElement = nameElement;
    this.contentsElement = contentsElement;
    this.timeStamp = new Date();

    console.log("Added file " + fileID + " @ " + new Date().toLocaleString());
}

fileCount = 0;
varCount = 0;

function addNewVariableTrace(containerID) {
    var variableDiv = document.createElement("div");

    var vdivID = "variable_" + ++varCount;

    variableDiv.setAttribute("class", "variable");
    variableDiv.setAttribute("id", vdivID);
    variableDiv.setAttribute("title", "Click to edit");

    var contentsDiv = createEditableDiv("name var_name", document.createTextNode("variable"));

    variableDiv.appendChild(contentsDiv);
    document.getElementById(containerID).appendChild(variableDiv);

    var entryDiv = document.createElement("div");
    entryDiv.setAttribute("class", "var_entries");

    variableDiv.appendChild(entryDiv);

    addNewVariableEntry(vdivID);

    var addEntry = document.createElement("button");

    addEntry.setAttribute("title", "Add new trace entry");
    addEntry.setAttribute("onclick", "addNewVariableEntry('" + vdivID + "')");
    addEntry.innerText = "+";

    variableDiv.appendChild(addEntry);

    console.log("Added variable " + varCount + " @ " + new Date().toLocaleString());
}

function addNewVariableEntry(containerID) {
    var entriesDiv = document.getElementById(containerID).getElementsByClassName("var_entries");
    console.log(entriesDiv);
    entriesDiv[0].appendChild(createEditableDiv("variable_entry", document.createTextNode("new value (step)")));
}

function addNewFile(containerID, fileClass, fileName, content) {
    var fileDiv = document.createElement("div");
    var fileID = "file_" + ++fileCount;
    fileDiv.setAttribute("class", fileClass);
    fileDiv.setAttribute("id", fileID);
    fileDiv.setAttribute("title", "Click to edit");

    // if no filename supplied, use default
    if (fileName == "") { fileName = "untitled.txt"; }

    var nameDiv = createEditableDiv("name", document.createTextNode(fileName));
    var contentDiv = createEditableDiv("", document.createTextNode(content));
    fileDiv.appendChild(nameDiv);
    fileDiv.appendChild(contentDiv);

    document.getElementById(containerID).appendChild(fileDiv);


    newACS.addFile(new TRACSfile(fileID, nameDiv, contentDiv));
}

function addNewEvaluation(containerID) {
    var evalDiv = document.createElement("div");
    evalDiv.setAttribute("class", "evaluation");

    evalDiv.appendChild(createEditableDiv("", document.createTextNode("[enter calculation steps here]")));

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