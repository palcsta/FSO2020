
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.get('/hello', (_req: Request, res: Response) => {
	res.send('Hello Full Stack!');
});

//http://localhost:3003/bmi?height=180&weight=72
app.get('/bmi', (_req: Request, res: Response) => {
	//if parameters are missing or malformatted return error with status 400
	if(!_req.query.height || !_req.query.weight || isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight))){
		//return	res.status(400).json({error: "malformatted parameters"});
		return res.status(400).send({error: "malformatted parameters"});
		
	}
	//if parameters are ok, return bmi in json format:{weight, height, bmi}
	return res.status(200).json(
		{weight: _req.query.weight,
		height:_req.query.height,
		bmi: calculateBmi(Number(_req.query.height),Number(_req.query.weight))});
	//res.send(calculateBmi(_req.query.height,_req.query.weight));
});
//test command:
//curl -X POST -H "Content-Type: application/json" -d '{"daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],"target": 2.5}' http://localhost:3003/exercises
app.post('/exercises', (req, res) => {
	//if parameters are missing return error with status 400 and json message telling parameters missing
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	//print content of the request
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

	//console.log(req.body);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if(!req.body.daily_exercises || !req.body.target){
		return res.status(400).send({error: "parameters missing"});
	}
	//console.log(req.body)
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { daily_exercises, target } = req.body;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const result = calculateExercises(daily_exercises, target);
		//res.send({ "result": result });
		console.log(result);
		return res.status(200).json(result);
	
	} catch (e) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return res.status(400).send({ 'error':"malformatted parameters"});
	}
	
	
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
