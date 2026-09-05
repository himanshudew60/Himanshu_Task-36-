const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connection')
const cors = require("cors");
const workoutRoutes = require('./routes/workoutRoutes')
const app = express();

dotenv.config();
const port = process.env.PORT ;
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/workouts',workoutRoutes)

app.listen(port, ()=>{
    console.log(`Server is Runnig on http://localhost:${port}`)
    
})