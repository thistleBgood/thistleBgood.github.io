function highlightSelection(t) {
    var userSelection = window.getSelection().getRangeAt(0);
    if (t === "e") {
        highlightExpression(userSelection);
	} else if (t === "c") {
		highlightComment(userSelection);
    } else {
        highlightStatement(userSelection);
    }

}

function highlightExpression(range) {
    var newNode = document.createElement("span");
    newNode.setAttribute(
       "class",
       "expression"
    );
    range.surroundContents(newNode);
}

function highlightComment(range) {
    var newNode = document.createElement("span");
    newNode.setAttribute(
       "class",
       "comment"
    );
    range.surroundContents(newNode);
}

function highlightStatement(range) {
    var newNode = document.createElement("span");
    newNode.setAttribute(
       "class",
       "statement"
    );
    range.surroundContents(newNode);
}

/* From parentChild.html */

function addNewParent() {
	var newDiv = document.createElement('div');
	newDiv.setAttribute("class", "child");
	newDiv.setAttribute("id", ++count);
	newDiv.setAttribute("onclick", "removeDiv(" + count + ")")
	newDiv.appendChild(document.createTextNode(count));
	document.getElementById("tt1").appendChild(newDiv);
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
	newDiv.setAttribute("id", ++count);
	newDiv.setAttribute("onclick", "removeDiv(" + count + ")")
	newDiv.appendChild(document.createTextNode(count));
	document.getElementById("parent").appendChild(newDiv);
	console.log("Added new node " + count + " at " + new Date().toLocaleString());
	nodes.push(count)
	localStorage.setItem("count", count)
	localStorage.setItem("nodes", nodes)
}

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
