const FETCH_FullMarket = `https://www.skyexch.art/exchange/member/playerService/queryFullMarkets`
const FETCH_FancyMarket = `https://www.skyexch.art/exchange/member/playerService/queryFancyBetMarkets`
const FETCH_BookMarket = `https://www.skyexch.art/exchange/member/playerService/queryBookMakerMarkets`
const FETCH_WithoutSelection = `https://www.skyexch.art/exchange/member/playerService/queryMarketsWithoutSelection`
const SERVER_URL = `https://54.158.38.118/exchange/member/playerService/queryFullMarkets`
const TEST_URL = `http://localhost:5000/skydata`


const sendToServer = (baseUrl, data) => {
    console.log(data);
    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
      console.log("success");
      // Handle the response data
    })
    .catch((error) => {
      console.error("error",error);
      // Handle any errors that occurred during the request
    });
}

const fetchData = (targetAPI, resultURL, eventId, marketId, eventType) => {

    return fetch(targetAPI, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": `JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%22${eventType}%22%2C%22eventId%22%3A%22${eventId}%22%2C%22marketId%22%3A%22${marketId}%22%7D`,
            "Referer": resultURL,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `eventId=${eventId}&marketId=${marketId}&selectionTs=-1&isGetRunnerMetadata=true&queryPass=C42AACA422038D2F78D9614B4251AF62.player01`,
        "method": "POST"
    })
}

module.exports = { 
    sendToServer,
    fetchData,
};



// // -----------------------------------------------------------------

// const FETCH_FullMarket = `https://www.skyexch.art/exchange/member/playerService/queryFullMarkets`
// const FETCH_FancyMarket = `https://www.skyexch.art/exchange/member/playerService/queryFancyBetMarkets`
// const FETCH_BookMarket = `https://www.skyexch.art/exchange/member/playerService/queryBookMakerMarkets`
// const FETCH_WithoutSelection = `https://www.skyexch.art/exchange/member/playerService/queryMarketsWithoutSelection`
// const SERVER_URL = `https://54.158.38.118/exchange/member/playerService/queryFullMarkets`
// const TEST_URL = `http://localhost:5000/skydata`

// const sendToServer = (baseUrl, data) => {
//     console.log(data);
//     fetch(baseUrl, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then((response) => {
//       console.log("success");
//       // Handle the response data
//     })
//     .catch((error) => {
//       console.error("error",error);
//       // Handle any errors that occurred during the request
//     });
// }

// async function fetchData(resultURL, eventId, marketId, eventType) {
//     const requests = [
//         {
//             url: FETCH_FullMarket,
//         },
//         {
//             url: FETCH_FancyMarket,
//         },
//         {
//             url: FETCH_BookMarket,
//         },
//         {
//             url: FETCH_WithoutSelection,
//         },
//     ];
//     const responses = await Promise.all(
//         requests.map((request) => {
//             console.log("request url", request.url);
//             return fetch(request.url, {
//                 "headers": {
//                     "accept": "application/json, text/javascript, */*; q=0.01",
//                     "accept-language": "en-US,en;q=0.9",
//                     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//                     "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//                     "sec-ch-ua-mobile": "?0",
//                     "sec-ch-ua-platform": "\"Windows\"",
//                     "sec-fetch-dest": "empty",
//                     "sec-fetch-mode": "cors",
//                     "sec-fetch-site": "same-origin",
//                     "x-requested-with": "XMLHttpRequest",
//                     "cookie": `JSESSIONID=C42AACA422038D2F78D9614B4251AF62.player01; _ga=GA1.2.229449976.1699152856; _gid=GA1.2.580020956.1699152856; _fw_crm_v=a76acf77-1b9e-4fb7-f951-bbdd660dff97; uiSelect_=%7B%22act%22%3A%22selectMarket%22%2C%22eventType%22%3A%22${eventType}%22%2C%22eventId%22%3A%22${eventId}%22%2C%22marketId%22%3A%22${marketId}%22%7D`,
//                     "Referer": resultURL,
//                     "Referrer-Policy": "strict-origin-when-cross-origin"
//                 },
//                 "body": `eventId=${eventId}&marketId=${marketId}&selectionTs=-1&isGetRunnerMetadata=true&queryPass=C42AACA422038D2F78D9614B4251AF62.player01`,
//                 "method": "POST"
//             })

//         })
//     )
//     responses()
// }

// module.exports = { 
//     sendToServer,
//     fetchData,
// };