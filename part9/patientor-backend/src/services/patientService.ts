import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';

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

export default {
    getPatients,
    getPatient,
    addPatient
};