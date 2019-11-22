document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("add").addEventListener('click', addFunc);
	document.getElementById("subtract").addEventListener('click', subFunc);
	document.getElementById("recalc").addEventListener("click", recalculate);
	document.getElementById("addWeights").addEventListener("click", addWeights);
});

function addFunc(){
	var quarter = document.getElementById("quarter").value;
	chrome.tabs.executeScript(null, {
		code: "var quarter = "+quarter+"; var add = true; var addWeights = false; var subtract = false;"
	}, function() {
		chrome.tabs.executeScript(null, {file: 'frontend.js'});
	});
}
function subFunc(){
	var quarter = document.getElementById("quarter").value;
	chrome.tabs.executeScript(null, {
		code: "var quarter = "+quarter+"; var add = false; var addWeights = false; var subtract = false;"
	}, function() {
		chrome.tabs.executeScript(null, {file: 'frontend.js'});
	});
}

function addWeights(){
	var quarter = document.getElementById("quarter").value;
	chrome.tabs.executeScript(null, {
		code: "var addWeights = true; var add = false; var subtract = false; var quarter = "+quarter+";"
	}, function(){
		chrome.tabs.executeScript(null, {file: "frontend.js"});
	});
}

function recalculate(){
	var quarter = document.getElementById("quarter").value;
	var isWeighted = false;
	if(document.getElementById("weighted").checked){
		isWeighted = true;
	}
	chrome.tabs.executeScript(null, {
		code: "var quarter = "+quarter+"; var isWeighted = "+isWeighted+";"
	}, function(){
		chrome.tabs.executeScript(null, {file: "recalculate.js"});
	});
}