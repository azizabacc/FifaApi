import  express  from 'express';
import Player from '../model/player.js'
const router = express.Router();

// get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find({});
        res.json(players);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
    });
    

    // get player by name 
// example : http://localhost:3000/api/players/231747
router.get('/:playerId', async (req, res) => {
    try {
        const playerId = parseInt(req.params.playerId);
        const player = await Player.findOne({ playerId: req.params.playerId});
        res.json(player);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
   
    }
});
export default router;    