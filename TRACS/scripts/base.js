window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var reader = new FileReader();

			reader.onload = function(e) {
				console.log("Importing " + file.name);
				process(fileDisplayArea, reader.result);
			}


			reader.readAsText(file);
		});
		
}


function process (fileDisplayArea, text) {
	
	while (fileDisplayArea.hasChildNodes()) {
		fileDisplayArea.removeChild(fileDisplayArea.lastChild);
	}
	
	
	
	lines = text.split("\n");
	
	var threadNode = document.createElement("div");
	threadNode.setAttribute("class", "thread");
	
	for (i in lines) {
        console.log(lines[i])
		
		var newNode = document.createElement("div");
		newNode.setAttribute("class", "statement");
		if (lines[i] == "") {
			newNode.innerHTML = "&nbsp;";
		} else {
			newNode.innerText = lines[i];
		}
		newNode.setAttribute("id", "range_" + i)
		threadNode.appendChild(newNode);
	}
	
	fileDisplayArea.appendChild(threadNode)
	document.getElementById("annotate").removeAttribute("disabled")
	
	localStorage.setItem("count", lines.length)

			document.getElementById("radios").setAttribute("style", "display: default");
			document.getElementById("dcfbutton").setAttribute("style", "display: default");
}
