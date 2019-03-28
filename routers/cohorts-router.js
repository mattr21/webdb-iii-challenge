const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);
 
// create cohorts
router.post('/', async (req, res) => {
    try {
        const [id] = await db('cohorts')
            .insert(req.body);

        const cohort = await db('cohorts')
            .where({ id: id })
            .first();

        res.status(201).json(cohort);      
    } catch (error) {
        res.status(500).json(error);
    }
});

// list all cohorts
router.get('/', async (req, res) => {
    try {
        const students = await db('cohorts');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'error getting cohorts' })
    }
});

// list specific cohort
router.get('/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first();

        res.status(200).json(cohort)
    } catch (error) {
        res.status(500).json(error);
    }
});

// list all students for the specified cohort

// update cohort
router.put('/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .update(req.body);

        if(count > 0) {
            const cohort = await db('cohorts')
                .where({ id: req.params.id })
                .first();

            res.status(200).json(cohort);
        } else {
            res.status(404).json({ message: 'Cohort not found.' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete cohort
router.delete('/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .del();

        if(count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Cohort not found' })
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;

