"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TideInfo = ({ stationId, startDate, endDate }) => {
  const [tideData, setTideData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTideData = async () => {
      try {
        const response = await axios.get('/api/tides', {
          params: {
            stationId,
            startDate,
            endDate,
          },
        });
        setTideData(response.data);
      } catch (error) {
        setError('Failed to fetch tide data');
      }
    };

    fetchTideData();
  }, [stationId, startDate, endDate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!tideData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Tide Information</h2>
      {tideData.predictions.map((prediction) => (
        <div key={prediction.t}>
          <p>
            <strong>Time:</strong> {prediction.t}
          </p>
          <p>
            <strong>Type:</strong> {prediction.type}
          </p>
          <p>
            <strong>Height:</strong> {prediction.v} feet
          </p>
        </div>
      ))}
    </div>
  );
};

export default TideInfo;
