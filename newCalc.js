/*var weighted = false;
var quarter = 3;*/
var Grade = class{
	constructor(gradeEl, isEl){
		var strScore;
		if(isEl){
			strScore = gradeEl.children[2].innerHTML;
		}
		else{
			strScore = gradeEl;
		}
		var splitScore = strScore.split("/");
		var gotten;
		var outOf;
		if(splitScore[0] == "" || splitScore[0] == "Excluded"){
			gotten = 0;
			outOf = 0;
		}
		else if(splitScore[0] == "Missing"){
			gotten = 0;
			outOf = parseFloat(strScore.split("/")[1]);
		}
		else{
			gotten = parseFloat(strScore.split("/")[0]);
			outOf = parseFloat(strScore.split("/")[1]);
		}
		this.score = [gotten, outOf];
		this.type = "";
		if(isEl){
			this.type = gradeEl.children[1].innerHTML;
		}
		else if(weighted){
			this.type = prompt("What type of assignment");
		}
	}

	getScore(){
		return this.score;
	}
	getGotten(){
		return this.score[0];
	}
	getOutOf(){
		return this.score[1];
	}
	getType(){
		return this.type;
	}
}

function searchArr(arr, el){
	for(var i = 0; i<arr.length; i++){
		if(arr[i] == el){
			return i;
		}
	}
	return -1;
}

var currentQ = document.getElementById("term-"+quarter+"Q");
var currentGradeStr = currentQ.children[1].innerHTML;
var currentGrade = parseFloat(currentGradeStr.substring(13, currentGradeStr.length-2));

var gradeEls = currentQ.children[2].children[2].children[1].children;
var grades = [];
for(var i = 0; i<gradeEls.length; i++){
	grades.push(new Grade(gradeEls[i], true));
}
var types = [];
var isFound = false;
for(var i = 0; i<grades.length; i++){
	if(searchArr(types, grades[i].getType()) === -1){
		types.push(grades[i].getType());
	}
}

var isDone = false;
while(!isDone){
	var moreGrades = prompt("Do you want to add a grade?(y/n)");
	if(!(moreGrades == "y" || moreGrades == "Y" || moreGrades == "yes" || moreGrades == "Yes")){
		isDone = true;
		break;
	}
	else{
		var newGrade = prompt("What grade do you want to add (XX/XX)");
		grades.push(new Grade(newGrade, false));

	}
}

if(!weighted){
	var totGot = 0;
	var totOut = 0;
	for (var i = 0; i < grades.length; i++) {
		totGot+=grades[i].getGotten();
		totOut+=grades[i].getOutOf();
	}
	var fullGrade = totGot/totOut;
	var roundGrade = (fullGrade*100);
	switch((""+currentGrade).length){
		case 2: roundGrade = Math.round(roundGrade);
		case 4: roundGrade = Math.round(roundGrade*10)/10;
		case 5: roundGrade = Math.round(roundGrade*100)/100;
	}
	console.log(roundGrade);
	alert(roundGrade);
}
else{
	var typeVal = [];
	for(var i = 0; i<types.length; i++){
		typeVal.push(parseFloat(prompt("How much is "+types[i]+" weighted (0.XX)")));
	}
	var gradeTypesGotten = [];
	var gradeTypesOutof = [];
	for (var i = 0; i < types.length; i++) {
		gradeTypesGotten.push(0);
		gradeTypesOutof.push(0);
	}
	for(var i = 0; i<grades.length; i++){
		var nextGrade = grades[i];
		gradeTypesGotten[searchArr(types, grades[i].getType())] += nextGrade.getGotten();
		gradeTypesOutof[searchArr(types, grades[i].getType())] += nextGrade.getOutOf();
	}
	var totalScore = 0;
	for(var i = 0; i<types.length; i++){
		totalScore+=(gradeTypesGotten[i]/gradeTypesOutof[i])*typeVal[i];
	}
	alert(totalScore);
}