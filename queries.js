// queries.js
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect();
const getRental = (req, res) => {
    pool.query('SELECT * from rental limit 5', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
};
const getActors = (req, res) => {
    console.log(`db getActors`);
    pool.query('SELECT actor_id, first_name, last_name FROM actor ORDER BY last_name ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
};
const updateActor = (req, res) =>{
    let id  = req.body.actorId;
    let firstname = req.body.firstName;
    pool.query('update actor set first_name = $1 where actor_id = $2 returning *', 
    [firstname, id], 
    (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

module.exports = {getRental, getActors, updateActor};