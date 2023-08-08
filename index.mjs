import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

app.get('/', (req, res) => {
res.render('index');
});

app.listen(3000, () => {
console.log('Server started on port 3000');
});