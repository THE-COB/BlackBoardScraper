var Grade = class{
	constructor(gradeEl){
		var strScore = gradeEl.children[2].innerHTML;
		var splitScore = strScore.split("/");
		var gotten;
		var outOf;
		if(splitScore[0] == "" || splitScore[0] == "Excluded"){
			gotten = 0;
			outOf = 0;
		}
		else if(splitScore[0] == "Missing"){
			gotten = 0;
			outOf = parseInt(strScore.split("/")[1]);
		}
		else{
			gotten = parseInt(strScore.split("/")[0]);
			outOf = parseInt(strScore.split("/")[1]);
		}
		this.score = [gotten, outOf];
		this.type = gradeEl.children[1].innerHTML;
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

var quarter = 3;//prompt("What quarter are you in");
var currentQ = document.getElementById("term-"+quarter+"Q");
var currentGradeStr = currentQ.children[1].innerHTML;
var currentGrade = parseFloat(currentGradeStr.substring(13, currentGradeStr.length-2));

var gradeEls = currentQ.children[2].children[2].children[1].children;
var grades = [];
for(var i = 0; i<gradeEls.length; i++){
	grades.push(new Grade(gradeEls[i]));
}

var totGot = 0;
var totOut = 0;
for (var i = 0; i < grades.length; i++) {
	totGot+=grades[i].getGotten();
	totOut+=grades[i].getOutOf();
}
var fullGrade = totGot/totOut;
var roundGrade = (fullGrade*100);
console.log(currentGrade);
console.log((""+currentGrade).length);
switch((""+currentGrade).length){
	case 2: roundGrade = Math.round(roundGrade);
	case 4: roundGrade = Math.round(roundGrade*10)/10;
	case 5: roundGrade = Math.round(roundGrade*100)/100;
}
console.log(roundGrade);
