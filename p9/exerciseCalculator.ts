interface Result {
	periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}//*/
function rating(avg: number){
	if(avg>2){return 3;}
	if(avg>1){return 2;}else{return 1}		
}
function desc(avg: number){
	if(avg>2){return "Good";}
	if(avg>1){return "not bad";}else{return "could be better"}
}
function calculateExercises(days: number[], target: number){
	
	return {
		periodLength: days.length,
		trainingDays: days.filter(x => x>0).length,
		success: (days.reduce((acc, curr) => acc + curr, 0)/(days.length) >= target),
		rating: rating(days.reduce((acc, curr) => acc + curr, 0)/(days.length)),
		ratingDescription: desc(days.reduce((acc, curr) => acc + curr, 0)/(days.length)),
		target: target,
		average: days.reduce((acc, curr) => acc + curr, 0)/(days.length)
	};
}

// Example usage:
//const numbersArray = [1, 2, 3, 4, 5];
//const notNumbersArray = [1, 'two', 3, 'four', 5];

//console.log(isNumberArray(numbersArray)); // Output: true
//console.log(isNumberArray(notNumbersArray)); // Output: false

if(process.argv.length > 3){
	try{
		if(!(process.argv.slice(3).map(i => Number(i)).includes(NaN)) && !isNaN(Number(process.argv[2]))){
			console.log(calculateExercises(process.argv.slice(3).map(i => Number(i)), Number(process.argv[2])))
		}else throw new Error("parameters contain something else than numbers.");
		
	}catch(e){
		console.error("could not run the function: "+e)
	}
	
	/*
	if(isNumberArray(process.argv.slice(2))){
	console.log(process.argv.slice(3), process.argv[2])
	//calculateExercises(process.argv.slice(3), process.argv[2])
	}
	else{console.log("Error, arguments were not numbers")}
	*/
	}



//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
//console.log(process.argv)
