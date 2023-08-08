import puppeteer from 'puppeteer';

(async () => {
  const startTime = performance.now();

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.goto('https://www.fifaindex.com/players/');
  
  const playerData = await page.evaluate(() => {
    const players = [];
    
    document.querySelectorAll('tbody > tr[data-playerid]').forEach(element => {
      const name = element.querySelector('td[data-title="Name"] > a').textContent;
      const nationality = element.querySelector('td[data-title="Nationality"] > a').getAttribute('title');
      const club = element.querySelector('td[data-title="Team"] > a').getAttribute('title');
      const overallRating = element.querySelector('td[data-title="OVR / POT"] > span:nth-child(1)').textContent;
      
      players.push({ name, nationality, club, overallRating });
    });
    
    return players;
  });
  
  console.log(playerData);
  
  await browser.close();
  const endTime = performance.now();
  console.log(`Time taken with Puppeteer: ${endTime - startTime} milliseconds`);
})();
