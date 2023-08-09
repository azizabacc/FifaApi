import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    playerId : String,
    name: String,
    nationality: String,
    club: String,
    overallRating: Number,
    playerImg: String,
    flagImg: String,
    clubImg: String


});

const Player = mongoose.model('players', playerSchema);

export default Player;