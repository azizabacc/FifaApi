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

        const collection = client.db('fifaindexDB').collection('teams');
        const response = await axios.get('https://www.fifaindex.com/teams/');
        const $ = cheerio.load(response.data);

        const insertionPromises = [];

        $('tbody tr').each((i, element) => {
            //td[data-title="Name"] > a : direct descending child
            const clubImg = $(element).find('td  a img').attr('src'); 
            const club = $(element).find('td[data-title="Name"] > a').attr('title');
            const league = $(element).find('td[data-title="League"] > a').attr('title');
            const nationality = $(element).find('td[data-title="Nationality"] > a').attr('title');
            const overallRating = $(element).find('td[data-title="OVR / POT"] > span:nth-child(1)').text();
            const playerImg = $(element).find('td img').attr('src');
            //td[data-title="Nationality"] img : descending child
            const flagImg = $(element).find('td[data-title="Nationality"] img').attr('src'); 
            console.log(i)
            console.log(league);
/*             insertionPromises.push(collection.insertOne({ name, nationality, club, overallRating, playerImg , flagImg ,clubImg }));
 */        });

/*         await Promise.all(insertionPromises);
        console.log('Data insertion completed.');
        const docs = await collection.find({}).toArray();
        console.log(`Found ${docs.length} documents in the collection`); 
        console.log(docs);  */
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
    }
})();
