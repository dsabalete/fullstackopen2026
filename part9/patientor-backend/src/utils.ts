import { Gender, NewPatientEntry } from './types';
import { z } from 'zod';

export const NewEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.unknown()).optional()
});

export const toNewPatient = (object: unknown): NewPatientEntry => {
    return NewEntrySchema.parse(object);
};