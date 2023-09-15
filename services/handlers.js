import axios from 'axios';
import moment from 'moment';
import { SAMPLE_DATA } from '../assets/data/sampleData';
import { FALLBACK_DATA } from '../assets/data/fallbackData';

const formatSparkline = (numbers) => {
  // price originally comes in as a price array with numbers. issue with this is that for our chart there is an x axis and y axis (two seperate values). we are going to create the x values

  // moment makes it really easy for us to subtract 7 days from today
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  let formattedSparkline = numbers.map((item, index) => {
    return {
      // increment time (x) value by 1 hour in seconds (3600 seconds)
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
  return formattedSparkline;
};

const formatMarketData = (data) => {
  let formattedData = [];

  data.forEach((item) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };

    formattedData.push(formattedItem);
  });
  return formattedData;
};

export const getMarketData = async () => {
  //  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d&locale=en

  try {
    // this is where the api call will go
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d&locale=en'
    );
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (err) {
    console.log(`${err}. Populating data from assets/data/fallbackData.js`);
    const formattedResponse = formatMarketData(FALLBACK_DATA);
    return formattedResponse;
  }
};
