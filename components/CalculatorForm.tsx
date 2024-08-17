import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';

const CalculatorForm: React.FC = () => {
  const [distance, setDistance] = useState('');
  const [tankCost, setTankCost] = useState('');
  const [tankLiters, setTankLiters] = useState('');
  const [avgSpeed, setAvgSpeed] = useState('');
  const [results, setResults] = useState<{ time: string, cost: string, liters: string } | null>(null);

  const handleCalculate = () => {
    const distanceNum = parseFloat(distance);
    const tankCostNum = parseFloat(tankCost);
    const tankLitersNum = parseFloat(tankLiters);
    const avgSpeedNum = parseFloat(avgSpeed);

    if (isNaN(distanceNum) || isNaN(tankCostNum) || isNaN(tankLitersNum) || isNaN(avgSpeedNum) || avgSpeedNum <= 0) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    // Calculate time (in hours)
    const time = distanceNum / avgSpeedNum;

    // Fuel consumption parameters
    const kmPerLiter = 10; // 10 km per liter
    const costPerLiter = 2.50; // Fixed cost of fuel per liter

    // Calculate total cost
    const fuelNeeded = distanceNum / kmPerLiter;
    const cost = fuelNeeded * costPerLiter;

    setResults({
      time: `${time.toFixed(2)} hours`,
      cost: `$${cost.toFixed(2)}`,
      liters: `${fuelNeeded.toFixed(2)} liters`
    });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="distance">Distance to travel (km):</label>
        <input
          type="number"
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Enter distance in kilometers"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="tankCost">Cost of a full tank of fuel ($):</label>
        <input
          type="number"
          id="tankCost"
          value={tankCost}
          onChange={(e) => setTankCost(e.target.value)}
          placeholder="Enter cost of a full tank"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="tankLiters">Number of liters in a full tank:</label>
        <input
          type="number"
          id="tankLiters"
          value={tankLiters}
          onChange={(e) => setTankLiters(e.target.value)}
          placeholder="Enter liters in a full tank"
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="avgSpeed">Average speed (km/h):</label>
        <input
          type="number"
          id="avgSpeed"
          value={avgSpeed}
          onChange={(e) => setAvgSpeed(e.target.value)}
          placeholder="Enter average speed"
        />
      </div>
      <button className={styles.calculateButton} onClick={handleCalculate}>
        Calculate
      </button>

      {results && (
        <div className={styles.results}>
          <p>Estimated Time: {results.time}</p>
          <p>Fuel Needed: {results.liters}</p>
          <p>Fuel Cost: {results.cost}</p>
          <p className={styles.note}>Fuel price is calculated at $2.50 per liter.</p>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;


