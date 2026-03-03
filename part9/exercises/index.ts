import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    console.log(target);

    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }

    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)
        || daily_exercises.some((e: unknown) => isNaN(Number(e)))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const dailyExercises = (daily_exercises as string[]).map(e => Number(e));
    const targetHours = Number(target);

    const result: Result = calculateExercises(dailyExercises, targetHours);
    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});