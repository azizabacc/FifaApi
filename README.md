# Football Statistics App Challenge
## Challenge objectif 
The objective of this challenge is to create a non-relational database using MongoDB Atlas, and scrape data from https://www.fifaindex.com/players/. Your application should be able to store and display player information, including player name, age, nationality, position, club, and ratings.
## Clone repository
```sh
git clone ..

```
## Scraping

For this challenge, we have two approaches to gather data from the website. We opted to use Cheerio, which proved to be approximately 18 times faster than the Puppeteer approach. By choosing Cheerio, we ensure a swift and efficient extraction of the required information from the website.
```sh
npm install axios cheerio 
```
OR 
```sh
npm install puppeteer
```


