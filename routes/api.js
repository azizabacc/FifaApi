import  express  from 'express';
import Player from '../model/player.js'
import playersRouter from './players.js'
import countryRouter from './country.js'
const router = express.Router();

router.use('/players',playersRouter);
router.use('/country',countryRouter);



export default router;