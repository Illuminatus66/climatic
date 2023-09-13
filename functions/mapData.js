import dotenv from 'dotenv';
dotenv.config();

exports.handler = async function (event, context) {
    const { lat, lng } = JSON.parse(event.body);

    const apiKey = process.env.TOMORROW_IO_API_KEY;
    const apiUrl = `https://api.tomorrow.io/v4/timelines?apikey=${apiKey}`;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        location: [lat, lng],
        fields: [
          'temperature',
          'temperatureApparent',
          'dewPoint',
          'humidity',
          'windSpeed',
          'pressureSeaLevel',
          'sunriseTime',
          'sunsetTime',
          'visibility',
          'cloudCover',
          'uvIndex',
          'precipitationIntensity',
          'precipitationProbability',
          'weatherCodeDay',
          'weatherCodeNight',
        ],
        units: 'metric',
        timesteps: ['1d'],
        startTime: 'now',
        endTime: 'nowPlus2d',
        timezone: 'Asia/Kolkata',
      }),
    };

    try {

    const response = await fetch(apiUrl, options);

    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(weatherData),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};
