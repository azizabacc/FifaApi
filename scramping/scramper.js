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
            const name = $(element).find('td[data-title="Name"] > a').text();
            const nationality = $(element).find('td[data-title="Nationality"] > a').attr('title');
            const club = $(element).find('td[data-title="Team"] > a').attr('title');
            const overallRating = $(element).find('td[data-title="OVR / POT"] > span:nth-child(1)').text();
            insertionPromises.push(collection.insertOne({ name, nationality, club, overallRating }));
        });

        await Promise.all(insertionPromises);
        console.log('Data insertion completed.');
        const docs = await collection.find({}).toArray();
        console.log(`Found ${docs.length} documents in the collection`);
        console.log(docs);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
    }
})();
