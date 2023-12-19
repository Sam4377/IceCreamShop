const pg = require('pg')
const express = require('express')
const cors = require('cors')
const app = express()

const client = new pg.Client('postgres://localhost/flavors')

app.use(cors())

//wanted to see what would happen
app.get('/', async (req, res, next) => {
    try {
        const SQL = `
            SELECT * 
            FROM flavors
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/flavors/:id', async (req,res, next) => {
    try {
        const SQL = `
        DELETE FROM flavors WHERE id=$1
        `
        const response = await client.query(SQL, [req.params.id])
        console.log(response)
        res.sendStatus(204)
        
    } catch (error) {
        next(error)
    }
})

app.use((error,req,res,next) => {
    res.status(500)
    res.send(error)
})

app.use('*', (req,res,next) => {
    res.send("No such route exists")
})

app.get('/api/flavors', async (req, res, next) => {
    try {
        const SQL = `
            SELECT * 
            FROM flavors
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("connected")
    const SQL = `
    DROP TABLE IF EXISTS flavors;
    CREATE TABLE flavors(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20)
        
    );
    INSERT INTO flavors (name) VALUES ('Vanilla');
    INSERT INTO flavors (name) VALUES ('Chocolate');
    INSERT INTO flavors (name) VALUES ('Strawberry');
    INSERT INTO flavors (name) VALUES ('Rocky Streets');
    INSERT INTO flavors (name) VALUES ('Cheesecake');
    INSERT INTO flavors (name) VALUES ('Blueberry');
    INSERT INTO flavors (name) VALUES ('Bourban Coffee');
    `
        await client.query(SQL)
        
        const port = process.env.PORT || 3002
        app.listen(port, () => {
            console.log(`listening on ${port}`)
        })
}
init()