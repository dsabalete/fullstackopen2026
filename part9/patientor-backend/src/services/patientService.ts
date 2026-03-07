import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient, Entry, NewEntry } from '../types';
import { parseDiagnosisCodes } from '../utils';

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const id: string = uuid();
    const newPatientEntry = {
        ...entry,
        entries: [],
        id
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        throw new Error('Patient not found');
    }

    const newEntry = {
        ...entry,
        id: uuid(),
        diagnosisCodes: parseDiagnosisCodes(entry)
    } as Entry;
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};