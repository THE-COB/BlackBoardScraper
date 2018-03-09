var dataPoints = document.getElementsByClassName("assignmentScore assignmentCell ").length;

var realDate = prompt("What was the date of the first assignment in the gradebook this quarter(exactly what it says on 'Due Date')"); 
var date;
for(var x = 0; x<dataPoints; x++){
	date = document.getElementsByClassName("assignmentDue assignmentCell  sorting_1")[x].innerHTML;
	if(date == realDate){
		break;
	}
}

var scores = [];
var yourPoints = [];
for(var i = x; i<dataPoints; i++){
	yourPoints.push(parseInt(document.getElementsByClassName("assignmentScore assignmentCell ")[i].innerHTML));
	scores.push(document.getElementsByClassName("assignmentScore assignmentCell ")[i].innerHTML);
}

realPoints = [];
realPointNum = [];
for(var j = 0; j<yourPoints.length; j++){
	if(!(isNaN(yourPoints[j]))){
		realPoints.push(yourPoints[j]);
		realPointNum.push(j);
	}
}

var newScores = [];
var q;
for(q = 0; q<realPointNum.length; q++){
	newScores.push(scores[realPointNum[q]]);
}

var endPointStrs = [];
var onePointStr;
var p;
for(p = 0; p<realPointNum.length; p++){
	onePointStr = newScores.shift();
	endPointStrs.push(onePointStr.split("/").pop());
}
var endPointNums = endPointStrs = endPointStrs.map(Number);

var endPointSum = 0;
for(var y = 0; y<endPointNums.length; y++){
	endPointSum = endPointSum + endPointNums[y];
}

var pointSum = 0;
for(var k = 0; k<realPoints.length; k++){
	pointSum = pointSum + realPoints[k];
}

var average = pointSum/endPointSum;

var moreGrades = "yes";
while(moreGrades=="yes"){
	var gradeScore = prompt("What grade do you want to add?")
	var newGradeScore = gradeScore
	var newGradeNum = newGradeScore.split('/')[0];
	var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
	newGradeDen = newGradeDen.slice(1);
	newGradeDen = parseInt(newGradeDen);
	newGradeNum = parseInt(newGradeNum);

	pointSum = pointSum+newGradeNum;
	endPointSum = endPointSum+newGradeDen;
	moreGrades = prompt("Any more grades you want to add?(yes/no)");
	
	average = pointSum/endPointSum;
	alert(average);
}