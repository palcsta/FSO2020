//create datatype Patient from 'data/patients.ts' without ssn 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}
interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

interface Diagnosis {
	code: string;
  name: string;
  latin?: string;
}


import data from './data/diagnoses';
import patients from './data/patients';
import express from 'express';
import { v1 as uuid } from 'uuid';

const uid = uuid();
//console.log(id);
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const getDiagnoses = (): Diagnosis[] => {
  return data;
};
/*
const getPatients = (): Patient[] => {
  return patients;
};
*/
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender,  occupation }) => ({
      id, name, dateOfBirth, gender,  occupation  
         }));
        };



app.get('/api/ping', (_req, res) => {
  //console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  //console.log('someone pinged here');
  //define data as Diagnosis[]

  res.send(getDiagnoses());
});
app.get('/api/patients', (_req, res) => {
  //should use unity type (makes sure, selecting and returning ONLY the wanted fields.)
  console.log('someone pinged /api/patients');
  res.send(getNonSensitivePatients());
});


const addPatient = (
  id: string,  name: string,  dateOfBirth: string,  ssn: string,  gender: string,  occupation: string, entries: Entry[]
  ): Patient => {

  const newPatientEntry = {
    id, name, dateOfBirth,ssn, gender,  occupation,entries
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  if(date.length < 8) return false;
  return Boolean(Date.parse(date));
};
//console.log(isGender('lll'));
//Set up safe parsing:'1'-> 1, validation: date isDate... and type predicate:"str" isStr__ to the POST /api/patients request.
//Refactor the gender field to use an enum type.

app.post('/api/patients', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth,ssn, gender,  occupation, entries } = _req.body;
  if (!name || !isString(name) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !dateOfBirth || !isDate(dateOfBirth) ||
    !ssn || !isString(ssn) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !gender || !isGender(gender) ||
    !occupation || !isString(occupation) ) {
      return res.status(400).json({ error: 'Invalid or missing data' });
  }
  const addedEntry = addPatient(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    uid, name, dateOfBirth,ssn, gender , occupation, entries, );

  //res.json(addedEntry);  
  return res.json(addedEntry); // Add this line to fix the problem

});

//create endpoint at /api/patients/:id
//return the patient with matching id or 404 if not found
//include the patient's entries in the response
app.get('/api/patients/:id', (req, res) => {
  console.log('someone pinged /api/patients/:id');
  const id = req.params.id;
  const typedPatients = patients as Patient[];
 

  const patient = typedPatients.find(p => p.id === id);
  //console.log(patient?.entries ? undefined : []);
  if (patient) {
    if (patient.entries) {
      res.send({
        ...patient,
        entries: patient.entries
      });
    }else{
      res.send({
        ...patient,
        entries: []
      });


    }
  } else {
    res.status(404).send('Patient not found');
  }
  
}
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});