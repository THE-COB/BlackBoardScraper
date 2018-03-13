/*
function onWindowLoad() {

  chrome.tabs.executeScript(null, {
    file: "unweighted.js"
  });

}

window.onload = onWindowLoad;
*/

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("weightedButton").addEventListener('click', weightedFunction);
	document.getElementById("unweightedButton").addEventListener('click', unweightedFunction);
});

/*
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("unweightedButton").addEventListener('click', weightedFunction);
});

function getData(){
	var realDate = document.getElementById("unweightedDate").value;
	alert(realDate);
}
*/

function weightedFunction(){
	chrome.tabs.executeScript(null, {
		file: "weighted.js"
	});	
}

function unweightedFunction(){
	chrome.tabs.executeScript(null, {
		file: "newCalc.js"
	});
}