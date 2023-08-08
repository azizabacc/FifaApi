import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
name: String,
nationality: String,
club: String,
overallRating: Number
});

const Player = mongoose.model('players', playerSchema);

export default Player;