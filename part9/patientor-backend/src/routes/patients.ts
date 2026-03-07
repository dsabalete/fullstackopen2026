import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry, NonSensitivePatient, Patient, NewEntry, Entry } from '../types';
import { NewPatientSchema, NewEntrySchema } from '../utils';

import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const patient = patientService.getPatient(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientService.addEntry(req.params.id, req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;