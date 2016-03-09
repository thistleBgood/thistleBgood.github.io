/* From parentChild.html */

count = 0;

function loadDefaultFiles(containerID) {

    addNewParent(containerID, "file", "stdIn", ".");
    addNewParent(containerID, "file", "stdOut", ".");
    addNewParent(containerID, "file", "stdErr", ".");
}

function addNewParent(containerID, childClass, fileName, content) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", childClass);
    newDiv.setAttribute("contenteditable", "");
    newDiv.setAttribute("id", "file_" + ++count);
    newDiv.setAttribute("onclick", "removeDiv(" + count + ")")
    if (fileName.length > 0) {
        newDiv.appendChild(document.createTextNode(fileName));
    } else {
        newDiv.appendChild(document.createTextNode("File " + count));
    }
    newDiv.appendChild(document.createElement("hr"));

    if (content.length > 0) {
        newDiv.appendChild(document.createTextNode(content));
    } else {
        newDiv.appendChild(document.createTextNode(""));
    }
    document.getElementById(containerID).appendChild(newDiv);
    /*
     var newParent = document.createElement('div');
     newParent.setAttribute("class", "parent");
     newParent.appendChild(document.createTextNode(count));
     document.getElementById("tt1").appendChild(newParent);*/
    //console.log("Added new variable " + count + " at " + new Date().toLocaleString());
}

function addNewDiv() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute("class", "child");
    newDiv.setAttribute("id", "file" + ++count);
    newDiv.setAttribute("onclick", "removeDiv(" + count + ")")
    newDiv.appendChild(document.createTextNode(count));
    document.getElementById("parent").appendChild(newDiv);
    console.log("Added new node " + count + " at " + new Date().toLocaleString());
    nodes.push(count)
    localStorage.setItem("count", count)
    localStorage.setItem("nodes", nodes)
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