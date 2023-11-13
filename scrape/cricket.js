const puppeteer = require('puppeteer');
const utils = require("./utils");

async function handleScraping() {
    let browser = null

    async function init() {
        browser = await puppeteer.launch({
            headless: true, // Use the new Headless mode
            // ... other options
        });
    }

    // for Cricket page
    async function launchCricket() {
        const page = await browser.newPage();
        
        // Navigate to a page that triggers AJAX requests
        await page.goto('https://www.skyexch.art/exchange/member/index.jsp?eventType=4', {
            timeout: 300000
        });
        console.log("page loaded!");

        await page.setRequestInterception(true);

        // Listen for the 'response' event
        page.on('response', async (response) => {

            let count = 0;
            
            const url = response.url();

            // Check if the response URL matches the desired URL
            if (url === 'https://www.skyexch.art/exchange/member/playerService/queryEventsWithMarket') {
                const responseBody = await response.text();
                const events = JSON.parse(responseBody).events;
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    try {
                        const market = event.markets[0];
                        const eventId = market.eventId;
                        // console.log("eventID >>> ", eventId);
                        const marketId = market.marketId;
                        // console.log("marketId >>> ", marketId);
                        count = count + 1;
                        const resultURL = `https://www.skyexch.art/exchange/member/fullMarket?eventType=4&eventId=${eventId}&marketId=${marketId}`;
                        // console.log("requestURL >>> ", resultURL);
                        const targetURL = `https://54.158.38.118/exchange/member/fullMarket?eventType=4&eventId=${eventId}&marketId=${marketId}`;
                        const testCricketURL = `http://localhost:5000/cricketdata`;
                        console.log("------------------------Cricket-"+count+"-----------------------");
                        // console.log("Cricket URL: ", targetURL);

                        const eventType = "4";
                        const FETCH_FullMarket = `https://www.skyexch.art/exchange/member/playerService/queryFullMarkets`
                        const FETCH_FancyMarket = `https://www.skyexch.art/exchange/member/playerService/queryFancyBetMarkets`
                        const FETCH_BookMarket = `https://www.skyexch.art/exchange/member/playerService/queryBookMakerMarkets`
                        const FETCH_WithoutSelection = `https://www.skyexch.art/exchange/member/playerService/queryMarketsWithoutSelection`
                        let FullMarketResponse = await utils.fetchData(FETCH_FullMarket, resultURL, eventId, marketId, eventType)
                        let FullMarketData = await FullMarketResponse.json();
                        let FuncyMarketResponse = await utils.fetchData(FETCH_FancyMarket, resultURL, eventId, marketId, eventType)
                        let FuncyMarketData = await FuncyMarketResponse.json();
                        let BookMarketResponse = await utils.fetchData(FETCH_BookMarket, resultURL, eventId, marketId, eventType)
                        let BookMarketData = await BookMarketResponse.json();
                        let WithoutMarketResponse = await utils.fetchData(FETCH_WithoutSelection, resultURL, eventId, marketId, eventType)
                        let WithoutMarketData = await WithoutMarketResponse.json();
                        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", FullMarketData);
                        let data = FullMarketData + FuncyMarketData + BookMarketData + WithoutMarketData;
                        var data1 = {FullMarketData, FuncyMarketData, BookMarketData, WithoutMarketData};
                        utils.sendToServer(testCricketURL, data1)
                        console.log("---------------------------------------------------");

                    } catch (error) {
                        console.log("There isn't a market.");
                    }
                    
                }
                
            }
        });
      
        // Disable request interception
        await page.setRequestInterception(false);

        // await browser.close();
    }

    // lunch main code for Cricket
    await init()
    await launchCricket()
    
}

// lunch full code
handleScraping().then(res => {
    // console.log('handle scraping have done!!')
})
