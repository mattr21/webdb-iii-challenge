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





module.exports = router;

