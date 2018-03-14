document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("weightedButton").addEventListener('click', weightedFunction);
	document.getElementById("unweightedButton").addEventListener('click', unweightedFunction);
});

function weightedFunction(){
	var quarter = document.getElementById("quarter").value;
	
	chrome.tabs.executeScript(null, {
		code: "var quarter = "+quarter+"; var weighted = true;"
	}, function() {
		chrome.tabs.executeScript(null, {file: 'newCalc.js'});
	});
}
function unweightedFunction(){
	var quarter = document.getElementById("quarter").value;
	alert(quarter);

	chrome.tabs.executeScript(null, {
		code: "var quarter = "+quarter+"; var weighted = false;"
	}, function() {
		chrome.tabs.executeScript(null, {file: 'newCalc.js'});
	});
}