function highlightExpression() {
    highlightRange("expression");
}

function highlightStatement() {
    highlightRange("statement");
}

function highlightComment() {
    highlightRange("comment");
}

function highlightRange(type) {
    var userSelection = window.getSelection().getRangeAt(0);
    var newNode = document.createElement("span");

    newNode.setAttribute("class", type);
    userSelection.surroundContents(newNode);
}