export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry;
  
export interface OccupationalHealthcareEntry {
    id: string;
    date: string;
    specialist: string;
    //type: string;
    description?: string;
    employerName?: string;
    healthCheckRating?: number;
    discharge?: {
      date: string;
      criteria: string;
    };
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
    diagnosisCodes?: string[];
    type: "OccupationalHealthcare";
}
export interface HospitalEntry {
    id: string;
    date: string;
    specialist: string;
    type: string;
    description?: string;
    employerName?: string;
    healthCheckRating?: number;
    discharge?: {
      date: string;
      criteria: string;
    };
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
    diagnosisCodes?: string[];
}
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }
  
  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }
  
  export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
  }
  export interface Diagnosis {
	code: string;
    name: string;
    latin?: string;
}
  export type PatientFormValues = Omit<Patient, "id" | "entries">;
  export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;