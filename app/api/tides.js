import axios from 'axios';

export default async function handler(req, res) {
  const { stationId, startDate, endDate } = req.query;
  const apiKey = process.env.NOAA_API_KEY;

  try {
    const response = await axios.get(
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter`, {
      params: {
        product: 'predictions',
        application: 'NOS.COOPS.TAC.WL',
        begin_date: startDate,
        end_date: endDate,
        datum: 'MLLW',
        station: stationId,
        time_zone: 'gmt',
        units: 'english',
        interval: 'hilo',
        format: 'json',
        api_key: apiKey
      }
    }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tide data' });
  }
}
