import { MongoClient } from 'mongodb';
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv'

dotenv.config({path :"../config/.env"})
const uri = process.env.atlasUri

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
    try {
        await client.connect();

        const collection = client.db('fifaindexDB').collection('players');
        const response = await axios.get('https://www.fifaindex.com/players/');
        const $ = cheerio.load(response.data);

        const insertionPromises = [];

        $('tbody > tr[data-playerid]').each((i, element) => {
            const PlayerImg = $(element).find('td img').attr('src');// img player
            const flagImg = $(element).find('td[data-title="Nationality"] img').attr('src');  // flag img ok

            const clubImg = $(element).find('td[data-title="Team"] img').attr('src');
            const overallRating = $(element).find('td[data-title="OVR / POT"] > span:nth-child(1)').text();
            console.log(clubImg);
       });


    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
    }
})();
