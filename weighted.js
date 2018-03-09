	//Getting the number of data points
	var dataPoints = document.getElementsByClassName("assignmentScore assignmentCell ").length;

	//finding which td to start with
	var realDate = prompt("What was the date of the first assignment in the gradebook this quarter(exactly what it says on 'Due Date')");
	var date;
	for(var x = 0; x<dataPoints; x++){
		date = document.getElementsByClassName("assignmentDue assignmentCell  sorting_1")[x].innerHTML;
		if(date == realDate){
			break;
		}
	}

	//get all point types
	var pointTypes = [];
	for(var w = x; w<dataPoints; w++){
		pointTypes.push(document.getElementsByClassName("assignmentType assignmentCell ")[w].innerHTML);
	}

	//function to get unique array values
	Array.prototype.contains = function(z) {
		for(var c = 0; c < this.length; c++) {
			if(this[c] === z) return true;
		}
		return false;
	};

	Array.prototype.unique = function() {
		var arr = [];
		for(var c = 0; c < this.length; c++) {
			if(!arr.contains(this[c])) {
				arr.push(this[c]);
			}
		}
		return arr; 
	}

	//assign variable to unique pointTypes
	var uniquePointTypes = pointTypes.unique();
	var numUniqueTypes = [];

	for(var b = 0; b<uniquePointTypes.length; b++){
		numUniqueTypes.push(b);
	}

	//put "break" where each point type leaves off
	var numEachType = [];
	for(var g = 0; g<uniquePointTypes.length; g++){
		for(var h = 0; h<pointTypes.length; h++){
			if(uniquePointTypes[g] == pointTypes[h]){
				numEachType.push(h);
			}
		}
		numEachType.push("break");
	}

	//find each place where the array "breaks"
	var numBreaks = [];
	var sumsOfPointStuff = pointTypes.length+uniquePointTypes.length;
	for(var r = 0; r<sumsOfPointStuff; r++){
		if(numEachType[r] == "break"){
			numBreaks.push(r);
		}
	}



	//function to calculate the avarages
	function getScores(whichNumType){
		var scores = [];
		var yourPoints = [];
		for(var i = 0; i<whichNumType.length; i++){
			yourPoints.push(parseInt(document.getElementsByClassName("assignmentScore assignmentCell ")[whichNumType[i]].innerHTML));
			scores.push(document.getElementsByClassName("assignmentScore assignmentCell ")[whichNumType[i]].innerHTML);
		}
		
		//filtering out the undefined values
		realPoints = [];
		realPointNum = [];
		for(var j = 0; j<yourPoints.length; j++){
			if(!(isNaN(yourPoints[j]))){
				realPoints.push(yourPoints[j]);
				realPointNum.push(j);
			}
		}

		//getting a new array for all the real score values
		var newScores = [];
		var q;
		for(q = 0; q<realPointNum.length; q++){
			newScores.push(scores[realPointNum[q]]);
		}

		//splitting the numerator and the denominator
		var endPointStrs = [];
		var onePointStr;
		var p;
		for(p = 0; p<realPointNum.length; p++){
			onePointStr = newScores.shift();
			endPointStrs.push(onePointStr.split("/").pop());
		}
		var endPointNums = endPointStrs = endPointStrs.map(Number);

		//getting all the sums of the points and point values
		var endPointSum = 0;
		for(var y = 0; y<endPointNums.length; y++){
			endPointSum = endPointSum + endPointNums[y];
		}

		var pointSum = 0;
		for(var k = 0; k<realPoints.length; k++){
			pointSum = pointSum + realPoints[k];
		}
		
		var average = pointSum/endPointSum;
		if(isNaN(average)){
			return "No Data Values";
		}
		else{
			return average;
		}
	}

	//function to make all the data values for the right quarter
	function fixNumArrays(item,index,arr) {
	arr[index] = item + x;
	}

	//gathering the values for each assignment type for each number of assignment types
	if(uniquePointTypes.length == 2){
		var numFirstType = [];
		var numSecondType = [];	
		
		for(var l1 = 0; l1<numEachType.length-numBreaks[0]; l1++){
			numFirstType.push(numEachType[l1]);
		}
		for(var l2 = l1+1; l2<numEachType.length-numBreaks[1]; l2++){
			numSecondType.push(numEachType[l2]);
		}

		numFirstType.forEach(fixNumArrays);
		numSecondType.forEach(fixNumArrays);

		numFirstAverage = getScores(numFirstType);
		numSecondAverage = getScores(numSecondType);
		
		var assign1 = prompt("What are "+uniquePointTypes[0]+" assignments weighted? Put as a decimal(0.XX)");
		var assign2 = prompt("What are "+uniquePointTypes[1]+" assignments weighted? Put as a decimal(0.XX)");
		
		var moreGrades = "yes";
		while(moreGrades=="yes"){
			var gradeScore = prompt("What grade do you want to add?(XX/XX)");
			var assignType = prompt("What assignment type is it?(Exactly what it says under type)");
			if(assignType == uniquePointTypes[0]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFirstAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[1]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numSecondAverage+newGradeAvg)/2;
			}
			moreGrades = prompt("Any more grades you want to add?(yes/no)");
		}
		
		var weightedAverage = (numFirstAverage*assign1)+(numSecondAverage*assign2);
		
	}

	if(uniquePointTypes.length == 3){
		var numFirstType = [];
		var numSecondType = [];
		var numThirdType = [];

		for(var t1 = 0; t1<numBreaks[0]; t1++){
			numFirstType.push(numEachType[t1]);
		}
		for(var t2 = t1+1; t2<numBreaks[1]; t2++){
			numSecondType.push(numEachType[t2]);
		}
		for(var t3 = t2+1; t3<numBreaks[2]; t3++){
			numThirdType.push(numEachType[t3]);
		}
		
		numFirstType.forEach(fixNumArrays);
		numSecondType.forEach(fixNumArrays);
		numThirdType.forEach(fixNumArrays);

		numFirstAverage = getScores(numFirstType);
		numSecondAverage = getScores(numSecondType);
		numThirdAverage = getScores(numThirdType);
		
		var assign1 = prompt("What are "+uniquePointTypes[0]+" assignments weighted? Put as a decimal(0.XX)");
		var assign2 = prompt("What are "+uniquePointTypes[1]+" assignments weighted? Put as a decimal(0.XX)");
		var assign3 = prompt("What are "+uniquePointTypes[2]+" assignments weighted? Put as a decimal(0.XX)");
		
		var moreGrades = "yes";
		while(moreGrades=="yes"){
			var gradeScore = prompt("What grade do you want to add?");
			var assignType = prompt("What assignment type is it?(Capitalize the first letter)");
			if(assignType == uniquePointTypes[0]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFirstAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[1]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numSecondAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[2]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numThirdAverage+newGradeAvg)/2;
			}
			moreGrades = prompt("Any more grades you want to add?(yes/no)");
		}
		var weightedAverage = (numFirstAverage*assign1)+(numSecondAverage*assign2)+(numThirdAverage*assign3);
	}

	if(uniquePointTypes.length == 4){
		var numFirstType = [];
		var numSecondType = [];
		var numThirdType = [];
		var numFourthType = [];
		
		for(var e1 = 0; e1<numBreaks[0]; e1++){
			numFirstType.push(numEachType[e1]);
		}
		for(var e2 = e1+1; e2<numBreaks[1]; e2++){
			numSecondType.push(numEachType[e2]);
		}
		for(var e3 = e2+1; e3<numBreaks[2]; e3++){
			numThirdType.push(numEachType[e3]);
		}
		for(var e4 = e3+1; e4<numBreaks[3]; e4++){
			numFourthType.push(numEachType[e4]);
		}	
		
		numFirstType.forEach(fixNumArrays);
		numSecondType.forEach(fixNumArrays);
		numThirdType.forEach(fixNumArrays);
		numFourthType.forEach(fixNumArrays);
		
		numFirstAverage = getScores(numFirstType);
		numSecondAverage = getScores(numSecondType);
		numThirdAverage = getScores(numThirdType);
		numFourthAverage = getScores(numFourthType);
		
		var assign1 = prompt("What are "+uniquePointTypes[0]+" assignments weighted? Put as a decimal(0.XX)");
		var assign2 = prompt("What are "+uniquePointTypes[1]+" assignments weighted? Put as a decimal(0.XX)");
		var assign3 = prompt("What are "+uniquePointTypes[2]+" assignments weighted? Put as a decimal(0.XX)");
		var assign4 = prompt("What are "+uniquePointTypes[3]+" assignments weighted? Put as a decimal(0.XX)");
		
		var moreGrades = "yes";
		while(moreGrades=="yes"){
			var gradeScore = prompt("What grade do you want to add?");
			var assignType = prompt("What assignment type is it?(Capitalize the first letter)");
			if(assignType == uniquePointTypes[0]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFirstAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[1]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numSecondAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[2]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numThirdAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[3]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFourthAverage+newGradeAvg)/2;
			}
			moreGrades = prompt("Any more grades you want to add?(yes/no)");
		}
		
		var weightedAverage = (numFirstAverage*assign1)+(numSecondAverage*assign2)+(numThirdAverage*assign3)+(numFourthAverage*assign4);
	}

	if(uniquePointTypes.length == 5){
		var numFirstType = [];
		var numSecondType = [];
		var numThirdType = [];
		var numFourthType = [];
		var numFifthType = [];
		
		for(var n1 = 0; n1<numBreaks[0]; n1++){
			numFirstType.push(numEachType[n1]);
		}
		for(var n2 = n1+1; n2<numBreaks[1]; n2++){
			numSecondType.push(numEachType[n2]);
		}
		for(var n3 = n2+1; n3<numBreaks[2]; n3++){
			numThirdType.push(numEachType[n3]);
		}
		for(var n4 = n3+1; n4<numBreaks[3]; n4++){
			numFourthType.push(numEachType[n4]);
		}
		
		numFirstType.forEach(fixNumArrays);
		numSecondType.forEach(fixNumArrays);
		numThirdType.forEach(fixNumArrays);
		numFourthType.forEach(fixNumArrays);
		numFifthType.forEach(fixNumArrays);
		
		numFirstAverage = getScores(numFirstType);
		numSecondAverage = getScores(numSecondType);
		numThirdAverage = getScores(numThirdType);
		numFourthAverage = getScores(numFourthType);
		numFifthAverage = getScores(numFifthType);
		
		var assign1 = prompt("What are "+uniquePointTypes[0]+" assignments weighted? Put as a decimal(0.XX)");
		var assign2 = prompt("What are "+uniquePointTypes[1]+" assignments weighted? Put as a decimal(0.XX)");
		var assign3 = prompt("What are "+uniquePointTypes[2]+" assignments weighted? Put as a decimal(0.XX)");
		var assign4 = prompt("What are "+uniquePointTypes[3]+" assignments weighted? Put as a decimal(0.XX)");
		var assign5 = prompt("What are "+uniquePointTypes[4]+" assignments weighted? Put as a decimal(0.XX)");
		
		var moreGrades = "yes";
		while(moreGrades=="yes"){
			var gradeScore = prompt("What grade do you want to add?");
			var assignType = prompt("What assignment type is it?(Capitalize the first letter)");
			if(assignType == uniquePointTypes[0]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFirstAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[1]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numSecondAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[2]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numThirdAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[3]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFourthAverage+newGradeAvg)/2;
			}
			if(assignType == uniquePointTypes[4]){
				var newGradeScore = gradeScore;
				var newGradeNum = newGradeScore.split('/')[0];
				var newGradeDen = newGradeScore.substring(newGradeScore.indexOf("/"));
				newGradeDen = newGradeDen.slice(1);
				var newGradeAvg = newGradeNum/newGradeDen;
				numFirstAverage = (numFifthAverage+newGradeAvg)/2;
			}
			moreGrades = prompt("Any more grades you want to add?(yes/no)");
		}
		
		var weightedAverage = (numFirstAverage*assign1)+(numSecondAverage*assign2)+(numThirdAverage*assign3)+(numFourthAverage*assign4)+(numFifthAverage*assign5);
	}
alert(weightedAverage);