var BBGrade = class BBGrade{
	constructor(date, grade, type, name){
		this.date = date;
		this.type = type;
		this.name = name;

		var splitScore = grade.split("/");
		var gotten;
		var outOf;
		if(splitScore[0] == "" || splitScore[0] == "Excluded"){
			gotten = 0;
			outOf = 0;
		}
		else if(splitScore[0] == "Missing"){
			gotten = 0;
			outOf = parseFloat(grade.split("/")[1]);
		}
		else{
			gotten = parseFloat(grade.split("/")[0]);
			outOf = parseFloat(grade.split("/")[1]);
		}
		this.score = [gotten, outOf];
	}
}

var quarterEl = document.getElementById("term-"+quarter+"Q");
var gradeTable = quarterEl.children[2].children[2].children[1];

var allGrades = [];
Array.prototype.forEach.call(gradeTable.children, function(row,index){
	var newDate;
	var newGrade;
	var newType;
	var newName;
	if(row.children[0].children.length != 0){
		newDate = row.children[3].children[0].value;
		newGrade = row.children[2].children[0].value;
		newType = row.children[1].children[0].value;
		newName = row.children[0].children[0].value;	
	}
	else{
		newDate = row.children[3].innerHTML;
		newGrade = row.children[2].innerHTML;
		newType = row.children[1].innerHTML;
		newName = row.children[0].innerHTML;
	}
	allGrades.push(new BBGrade(newDate,newGrade,newType,newName));
});

if(!isWeighted){
	var totalEarned = 0;
	var totalOutOf = 0;
	allGrades.forEach((grade, ind) => {
		totalEarned+=grade.score[0];
		totalOutOf+=grade.score[1];
	});
	var totalGrade = totalEarned/totalOutOf;
	var gradeLetter = "F";
	if(totalGrade>=.6 && totalGrade<0.7){
		gradeLetter = "D";
	}
	else if(totalGrade>=0.7 && totalGrade<0.8){
		gradeLetter = "C";
	}
	else if(totalGrade>=0.8 && totalGrade<0.9){
		gradeLetter = "B";
	}
	else if(totalGrade>=0.9){
		gradeLetter = "A";
	}
	var gradeFormed = Math.round(totalGrade*10000)/100;
	var gradeDisp = document.querySelector("#term-2Q > h3");
	gradeDisp.innerHTML = quarter+"Q Grade: "+gradeLetter+" ["+gradeFormed+"%]";
}
else{
	var typeInps = document.getElementById("typeInps");
	if(typeInps){
		var typeWeights = {};
		var orgedGrades = {};
		Array.prototype.forEach.call(typeInps.children, (type,index) => {
			typeWeights[type.name] = parseFloat(type.value);
			orgedGrades[type.name] = [0,0];
		});
		allGrades.forEach((grade,index) => {
			orgedGrades[grade.type][0]+=grade.score[0];
			orgedGrades[grade.type][1]+=grade.score[1];
		});
		var totalGrade = 0;
		Object.entries(orgedGrades).forEach((type,ind) => {
			if(type[0] != "undefined"){
				totalGrade+=(type[1][0]/type[1][1])*typeWeights[type[0]];	
			}
		});
		var gradeLetter = "F";
		if(totalGrade>=.6 && totalGrade<0.7){
			gradeLetter = "D";
		}
		else if(totalGrade>=0.7 && totalGrade<0.8){
			gradeLetter = "C";
		}
		else if(totalGrade>=0.8 && totalGrade<0.9){
			gradeLetter = "B";
		}
		else if(totalGrade>=0.9){
			gradeLetter = "A";
		}
		var gradeFormed = Math.round(totalGrade*10000)/100;
		var gradeDisp = document.querySelector("#term-2Q > h3");
		gradeDisp.innerHTML = quarter+"Q Grade: "+gradeLetter+" ["+gradeFormed+"%]";
	}
	else{
		alert("Please add in the weights of the assignment types");
	}
}