import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'));
// Note: Don't add or change anything above this line.


// Stats object
const stats = {
    interval: 10,
    apiCount: 0
}

// Middleware function to track stats
app.use('/random-person', (req, res, next) =>{
    // Track total API count
    stats.apiCount += 1
    // Check if printing is needed
    if (stats.apiCount % stats.interval === 0){
        const message = `The current number of API calls is: ${stats.apiCount}`
        console.log(message)
    }
    // Call next /random-person function in the pipeline
    next()
})

// API handler
app.get('/random-person', asyncHandler(async (req, res)=>{
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    res.send(data)
}))

// Error handler middleware function 
app.use((error, req, res, next) =>{
    console.error(error.stack)
    res.status(500).send({error:'error on backend'})
})

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});