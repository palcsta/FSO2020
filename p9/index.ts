const express = require('express');
const app = express();
import { calculateBmi } from "./bmiCalculator";

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!');
});

//http://localhost:3003/bmi?height=180&weight=72
app.get('/bmi', (_req: any, res: any) => {
	//if parameters are missing or malformatted return error with status 400
	if(!_req.query.height || !_req.query.weight || isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight))){
		//return	res.status(400).json({error: "malformatted parameters"});
		return res.status(400).send({error: "malformatted parameters"});
		
	}
	//if parameters are ok, return bmi in json format:{weight, height, bmi}
	return res.status(200).json({weight: _req.query.weight,height:_req.query.height, bmi: calculateBmi(_req.query.height,_req.query.weight)});
	//res.send(calculateBmi(_req.query.height,_req.query.weight));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
