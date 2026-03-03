import express from 'express';
import diaries from '../../data/entries';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diaries);
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;