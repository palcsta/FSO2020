/*
calculateBmi(180, 74) => "Normal (healthy weight)"
Underweight (Severe thinness) 		< 16.0 	
Underweight (Moderate thinness) 	16.0 – 16.9 	
Underweight (Mild thinness) 		17.0 – 18.4 	
Normal range 						18.5 – 24.9 	
Overweight (Pre-obese) 				25.0 – 29.9 	
Obese (Class I) 					30.0 – 34.9 	
Obese (Class II) 					35.0 – 39.9 	
Obese (Class III) 					≥ 40.0 	
*/
export function calculateBmi(h: number, w: number): string {
	const bmi: number = w/(h/100)**2;
	if(bmi < 16){
		return "Underweight (Severe thinness)";
	}
	if(bmi >= 16 && bmi <= 16.9){
		return "Underweight (Moderate thinness)";
	}
	if(bmi >= 17 && bmi <= 18.4){
		return "Underweight (Mild thinness)";
	}
	if(bmi >= 18.5 && bmi <= 24.9){
		return "Normal (healthy weight)";
	}
	if(bmi >= 25 && bmi <= 29.9){
		return "Overweight (Pre-obese)";
	}
	if(bmi >= 30 && bmi <= 34.9){
		return "Obese (Class I)";
	}
	if(bmi >= 35 && bmi <= 39.9){
		return "Obese (Class II)";
	}
	if(bmi >= 40){
		return "Obese (Class III)";
	}
	return "Invalid input";
}
if(process.argv.length == 4){
	try{
		if(!isNaN(Number(process.argv[3])) && !isNaN(Number(process.argv[2]))){
			console.log(calculateBmi(Number(process.argv[2]),Number(process.argv[3])));
		}else throw new Error("parameters contain something else than numbers.");
		
	}catch(e){
		console.error("could not run the function: "+e);
	}}
	