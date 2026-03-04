import { Gender, NewPatientEntry } from './types';

const isObject = (object: unknown): object is Record<string, unknown> => {
    return typeof object === 'object' && object !== null;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
    if (!isString(value) || value.trim().length === 0) {
        throw new Error('Incorrect or missing string: ' + value);
    }
    return value;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export const toNewPatient = (object: unknown): NewPatientEntry => {
    if (!isObject(object)) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };
        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};