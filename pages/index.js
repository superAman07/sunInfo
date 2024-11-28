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

    const userAngle = angle.trim().toLowerCase();
    
    // Handle "Max Height" (Solar Noon)
    if (userAngle === "max height") {
      const maxHeightTime = new Date(times.solarNoon);
      setResult(`Max Height (Solar Noon) at: ${maxHeightTime.toLocaleTimeString()}`);
      return;
    }

    const parsedAngle = parseFloat(angle);
    if (isNaN(parsedAngle) || parsedAngle < -90 || parsedAngle > 90) {
      setResult('Please enter a valid angle between -90° and 90° or "Max Height".');
      return;
    }

    // Handle -15° (Morning civil twilight)
    if (parsedAngle === -15) {
      const dawnTime = times.dawn ? times.dawn.toLocaleTimeString() : 'No dawn time available';
      setResult(`-15° Morning Civil Twilight: ${dawnTime}`);
      return;
    }

    // Handle 0° (Sunrise)
    if (parsedAngle === 0) {
      setResult(`Sunrise: ${times.sunrise.toLocaleTimeString()}`);
      return;
    }

    // Handle 45° (Specific angle case)
    if (parsedAngle === 45) {
      let targetTime = null;
      const date = new Date();
      for (let i = 0; i <= 1440; i += 5) {  
        const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);
        const position = SunCalc.getPosition(time, lat, lng);
        const altitude = (position.altitude * 180) / Math.PI;  

        if (Math.abs(altitude - 45) < 0.5) {
          targetTime = time;
          break;
        }
      }
      if (targetTime) {
        setResult(`Time when sun is at 45°: ${targetTime.toLocaleTimeString()}`);
      } else {
        setResult('The sun does not reach 45° at this location on this date.');
      }
      return;
    }

    // Handle tan⁻¹(2) which corresponds to ~63.43°
    if (Math.abs(parsedAngle - Math.atan(2) * (180 / Math.PI)) < 0.5) {
      let targetTime = null;
      const date = new Date();
      for (let i = 0; i <= 1440; i += 5) {  
        const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);
        const position = SunCalc.getPosition(time, lat, lng);
        const altitude = (position.altitude * 180) / Math.PI;  

        if (Math.abs(altitude - 63.43) < 0.5) {
          targetTime = time;
          break;
        }
      }
      if (targetTime) {
        setResult(`Time when sun is at tan⁻¹(2) (63.43°): ${targetTime.toLocaleTimeString()}`);
      } else {
        setResult('The sun does not reach 63.43° at this location on this date.');
      }
      return;
    }

    // Handle 0° (Sunset)
    if (parsedAngle === 0) {
      setResult(`Sunset: ${times.sunset.toLocaleTimeString()}`);
      return;
    }

    // Handle -15° (Evening civil twilight)
    if (parsedAngle === -15) {
      const duskTime = times.dusk ? times.dusk.toLocaleTimeString() : 'No dusk time available';
      setResult(`-15° Evening Civil Twilight: ${duskTime}`);
      return;
    }

    // Handle other angles
    let targetTime = null;
    const date = new Date();
    for (let i = 0; i <= 1440; i += 5) {  
      const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);
      const position = SunCalc.getPosition(time, lat, lng);
      const altitude = (position.altitude * 180) / Math.PI;  

      if (Math.abs(altitude - parsedAngle) < 0.5) {
        targetTime = time;
        break;
      }
    }

    if (!targetTime) {
      setResult(`The sun does not reach an altitude of ${parsedAngle}° at this location on this date.`);
      return;
    }

    const sunrise = times.sunrise.toLocaleTimeString();
    const sunset = times.sunset.toLocaleTimeString();
    const altitudeNow = (SunCalc.getPosition(new Date(), lat, lng).altitude * 180) / Math.PI;

    setResult(`
      Sunrise: ${sunrise},
      Sunset: ${sunset},
      Current Altitude: ${altitudeNow.toFixed(2)}°,
      Time at ${parsedAngle}°: ${targetTime.toLocaleTimeString()}
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
        placeholder="Enter angle (-90° to 90°) or 'Max Height'"
        className="bg-transparent w-96 p-2 border border-gray-400 mb-4"
      />
      <button
        onClick={calculateMain}
        className="p-2 w-14 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go
      </button>
      <div className="mt-4 text-lg">{result}</div>
    </div>
  );
}
