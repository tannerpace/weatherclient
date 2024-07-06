import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getSurfInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiUrl = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ZIP&sortfield=name&sortorder=desc';
    const config = {
      headers: {
        token: process.env.NOAA_TOKEN
      }
    };

    const response = await axios.get(apiUrl, config);

    if (response.data && response.data.results) {
      res.status(200).json(response.data.results);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

export default getSurfInfo;
