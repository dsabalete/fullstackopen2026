import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getPatients());
});

router.post('/', (req: Request<unknown, unknown, unknown>, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;