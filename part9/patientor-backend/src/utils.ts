import { Gender, NewPatientEntry, HealthCheckRating, Diagnosis } from './types';
import { z } from 'zod';

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const BaseEntrySchema = z.object({
    description: z.string().min(1),
    date: z.string().date(),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const SickLeaveSchema = z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string().min(1),
    sickLeave: SickLeaveSchema.optional(),
});

const DischargeSchema = z.object({
    date: z.string().date(),
    criteria: z.string().min(1),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: DischargeSchema,
});

export const NewEntrySchema = z.union([
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema,
]);

export const NewPatientSchema = z.object({
    name: z.string().min(1),
    dateOfBirth: z.string().date(),
    ssn: z.string().min(1),
    gender: z.nativeEnum(Gender),
    occupation: z.string().min(1),
});

export const toNewPatient = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};