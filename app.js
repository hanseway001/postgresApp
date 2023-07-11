const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
const pg =  require('pg');
const db = require('./queries');


app.get('/', (req,res) => {
    res.send('its up')
})

app.get('/actors', db.getActors)
app.get('/rentanls', db.getRental)
app.get('/updateActor', db.updateActor)
app.post('/updateActors', db.updateActor);

app.listen(port, ()=>{
    console.log(`server is up and listening on port ${port}`)
})