import express from 'express';
import mongoose from 'mongoose';

const app = express();

//connection to database
const YOUR_CONNECTION_STRING_HERE = "mongodb+srv://azizabacc:quQqOC0exDbTAUzw@clustermongodbintro.nk9hiym.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(YOUR_CONNECTION_STRING_HERE, {
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