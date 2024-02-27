export interface Result {
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
	if(avg>1){return 2;}else{return 1;}		
}
function desc(avg: number){
	if(avg>2){return "Good";}
	if(avg>1){return "not bad";}else{return "could be better";}
}
//export following function as a typescript module
export function calculateExercises(days: number[], target: number): Result{
	
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

if(process.argv.length > 3){
	try{
		if(!(process.argv.slice(3).map(i => Number(i)).includes(NaN)) && !isNaN(Number(process.argv[2]))){
			console.log(calculateExercises(process.argv.slice(3).map(i => Number(i)), Number(process.argv[2])));
		}else throw new Error("parameters contain something else than numbers.");
		
	}catch(e){
		console.error("could not run the function: "+e);
	}
	
	}

