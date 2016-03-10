/* From parentChild.html */

count = 0;

function loadDefaultFiles(containerID) {

    addNewEntry(containerID, "file", "<<stdIn>>", ".");
    addNewEntry(containerID, "file", "<<stdOut>>", ".");
    addNewEntry(containerID, "file", "<<stdErr>>", ".");
}

function addNewEntry(containerID, childClass, fileName, content) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", childClass);
    newDiv.setAttribute("id", "file_" + ++count);
    newDiv.setAttribute("onclick", "removeDiv(" + count + ")")

    var nameDiv = document.createElement("div")
    nameDiv.setAttribute("class", "name");
    nameDiv.setAttribute("contenteditable", "");

    if (fileName.length > 0) {
        nameDiv.appendChild(document.createTextNode(fileName));
    } else {
        nameDiv.appendChild(document.createTextNode("File " + count));
    }

    newDiv.appendChild(nameDiv);

    var contentDiv = document.createElement("div")

    contentDiv.setAttribute("contenteditable", "");

    contentDiv.appendChild(document.createTextNode(content))

    newDiv.appendChild(contentDiv);

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