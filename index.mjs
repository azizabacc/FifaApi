import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js'

dotenv.config({path :"./config/.env"})
const app = express();

//connection to database
const atlasUri  = process.env.atlasUri 
mongoose.connect(atlasUri , {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('MongoDB Atlas connected!');
}).catch(err => {
console.log(err);
});

// routes
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended : false}))



app.use('/api', apiRouter);
app.listen(3000, () => {
console.log('Server started on port 3000');
});