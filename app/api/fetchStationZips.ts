import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function fetchStationsZip(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.NOAA_TOKEN

  if (!token) {
    return res.status(500).json({ error: 'Token not found' })
  }

  const apiUrl = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ZIP&sortfield=name&sortorder=desc'

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        token: token
      }
    })

    if (response.data && response.data.results) {
      res.status(200).json(response.data.results)
    } else {
      console.log('No data found')
      res.status(404).json({ error: 'No data found' })
    }
  } catch (error) {
    console.error('Error fetching stations ZIP:', error)
    res.status(500).json({ error: 'Error fetching stations ZIP' })
  }
}
