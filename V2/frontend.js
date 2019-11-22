var quarterEl = document.getElementById("term-"+quarter+"Q");

var gradeTable = quarterEl.children[2].children[2].children[1];

if(addWeights){
	var allTypes = [];
	Array.prototype.forEach.call(gradeTable.children, function(row,index){
		if(row.children[1].children.length == 0){
			if(!allTypes.includes(row.children[1].innerHTML)){
				allTypes.push(row.children[1].innerHTML);
			}
		}
	});
	var typeInps = document.createElement("div");
	typeInps.setAttribute("id", "typeInps");
	allTypes.forEach(function(type,index){
		var newTypeInp = document.createElement("input");
		var newType = document.createElement("p");
		newType.innerHTML = type;
		newTypeInp.setAttribute("name", type);
		newTypeInp.setAttribute("type", "number");
		newTypeInp.setAttribute("placeholder", "ex: 0.25");
		typeInps.appendChild(document.createElement("br"));
		typeInps.appendChild(document.createElement("br"));
		typeInps.appendChild(newType);
		typeInps.appendChild(newTypeInp);
	});
	quarterEl.appendChild(typeInps);
}
else if(add){
	var gradeNum = gradeTable.children.length;
	var newTrClass = "even";
	if(gradeTable.children[gradeNum-1].getAttribute("class") === "even"){
		newTrClass = "odd";
	}
	var newTr = document.createElement("tr");
	newTr.setAttribute("class", newTrClass);
	newTr.innerHTML = '<td class="assignmentName assignmentCell "><input type="text" value="name(not necessary)"></td>\n<td class="assignmentType assignmentCell " style="text-align:center"><input type="text" value="type(necessary if grade is weighted)"></td>\n<td class="assignmentScore assignmentCell "><input type="text" value="0/0"></td>\n<td class="assignmentDue assignmentCell  sorting_1"><input type="text" value="00/00/0000"></td>\n<td class="assignmentComment assignmentCell "></td>'
	gradeTable.appendChild(newTr);
}
else if(subtract){
	gradeTable.removeChild(gradeTable.childNodes[gradeTable.children.length-1]);
}