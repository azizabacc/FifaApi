import  express  from 'express';
import Player from '../model/player.js'

const router = express.Router();

// get player by country 
router.get('/:country', async (req, res) => {
    try {
        const players = await Player.find({nationality : req.params.country});
        res.json(players);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
    });
    
export default router;