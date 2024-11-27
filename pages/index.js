import axios from "axios";
import { useState } from "react";
import SunCalc from "suncalc";

export default function Home() {
  const [location, setLocation] = useState('');
  const [angle, setAngle] = useState('');
  const [result, setResult] = useState(null);

  const calculateMain = async () => {
    try {
      const api = "7a6f67f4e6764821a793fb652a876eb4"; 
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${api}`);
      const data = response.data;

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        calculateSunData(lat, lng);
      } else {
        setResult('Location not found. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setResult('Error fetching location. Please try again.');
    }
  };

  function calculateSunData(lat, lng) {
    const times = SunCalc.getTimes(new Date(), lat, lng); 
    if (!times.sunrise || !times.sunset) {
      setResult('The sun does not rise or set at this location on this date.');
      return;
    }
    const userAngle = parseFloat(angle);
    if (isNaN(userAngle) || userAngle < -90 || userAngle > 90) {
      setResult('Please enter a valid angle between -90° and 90°.');
      return;
    }
 
    if (userAngle < 0) {
      const belowHorizonTime = userAngle === -15
        ? `Civil Twilight starts: ${times.dawn.toLocaleTimeString()}`
        : 'Negative angle is not supported for precise calculation.';
      setResult(belowHorizonTime);
      return;
    }
    let targetTime = null;
    const date = new Date();
    for (let i = 0; i <= 1440; i += 5) {  
      const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);
      const position = SunCalc.getPosition(time, lat, lng);
      const altitude = (position.altitude * 180) / Math.PI;  

      if (Math.abs(altitude - userAngle) < 0.5) {  
        targetTime = time;
        break;
      }
    }

    // edge cases 
    if (!targetTime) {
      setResult(`The sun does not reach an altitude of ${userAngle}° at this location on this date.`);
      return;
    }
    const sunrise = times.sunrise.toLocaleTimeString();
    const sunset = times.sunset.toLocaleTimeString();
    const altitudeNow = (SunCalc.getPosition(new Date(), lat, lng).altitude * 180) / Math.PI;

    setResult(`
      Sunrise: ${sunrise},
      Sunset: ${sunset},
      Current Altitude: ${altitudeNow.toFixed(2)}°,
      Time at ${userAngle}°: ${targetTime.toLocaleTimeString()}
    `);
  }

  return (
    <div className="flex flex-col p-11 m-11">
      <input
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
        className="bg-transparent w-96 p-2 border border-gray-400 mb-4"
      />
      <input
        onChange={(e) => setAngle(e.target.value)}
        placeholder="Enter angle (-90° to 90°)"
        className="bg-transparent w-96 p-2 border border-gray-400 mb-4"
      />
      <button
        onClick={calculateMain}
        className="p-2 w-10 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go
      </button>
      <div className="mt-4 text-lg">{result}</div>
    </div>
  );
}
