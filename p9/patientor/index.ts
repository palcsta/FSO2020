import {Diagnosis,NonSensitivePatient, Entry,Patient, Gender } from './src/types';
import data from './data/diagnoses';
//import patients from './data/patients';
import patients from './data/patients-full';
import express from 'express';
import { v1 as uuid } from 'uuid';

const uid = uuid();
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender,  occupation }) => ({
      id, name, dateOfBirth, gender: gender as Gender,  occupation  
         }));
        };
/*const getPatients = (): Patient[] => {
    return patientsFull;
  };*/



app.get('/api/ping', (_req, res) => {
  //console.log('someone pinged here');
  res.send("pong");
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(getDiagnoses());
});
app.get('/api/patients', (_req, res) => {
  console.log('someone pinged /api/patients');
  if(patients.length>1){res.send(patients);}else{res.send(getNonSensitivePatients());}
});


const addPatient = (
  id: string,  name: string,  dateOfBirth: string,  ssn: string,  gender: Gender,  occupation: string, entries: Entry[]
  ): Patient => {

  const newPatientEntry = {
    id, name, dateOfBirth,ssn, gender,  occupation,entries
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};
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
app.get('/api/patients/:id', (req, res) => {console.log('someone pinged /api/patients/:id');

  const id = req.params.id;
  const patient = patients.find(p => p.id === id);

  if (patient) {
    res.send(patient);
  }else {
    res.status(404).send('Patient not found');
  }
  
}
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});