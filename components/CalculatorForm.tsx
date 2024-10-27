import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';

// Utility functions for validation and calculations
const isValidNumber = (value: string) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

const showAlert = () => alert("Please enter valid numbers for all fields.");


const defaultCalculationStrategy = (distanceNum: number, avgSpeedNum: number) => {
  const kmPerLiter = 10; // 10 km per liter
  const costPerLiter = 2.50; // Fixed cost of fuel per liter

  // Calculate time (in hours)
  const time = distanceNum / avgSpeedNum;

  // Calculate total fuel needed and cost
  const fuelNeeded = distanceNum / kmPerLiter;
  const cost = fuelNeeded * costPerLiter;

  return {
    time: `${time.toFixed(2)} hours`,
    cost: `$${cost.toFixed(2)}`,
    liters: `${fuelNeeded.toFixed(2)} liters`
  };
};

// Input Fields
const createInputField = (
  id: string,
  label: string,
  value: string,
  setValue: (value: string) => void,
  placeholder: string
) => (
  <div className={styles.inputGroup} key={id}>
    <label className={styles.label} htmlFor={id}>{label}</label>
    <input
      type="number"
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

// calculate action patten
const calculateCommand = (
  distance: string,
  tankCost: string,
  tankLiters: string,
  avgSpeed: string,
  calculateResults: (distanceNum: number, avgSpeedNum: number) => { time: string, cost: string, liters: string },
  setResults: React.Dispatch<React.SetStateAction<{ time: string, cost: string, liters: string } | null>>
) => {
  const distanceNum = parseFloat(distance);
  const avgSpeedNum = parseFloat(avgSpeed);

  if (!isValidNumber(distance) || !isValidNumber(tankCost) || !isValidNumber(tankLiters) || !isValidNumber(avgSpeed)) {
    showAlert();
    return;
  }

  const results = calculateResults(distanceNum, avgSpeedNum);
  setResults(results);
};

// Custom hook for form state management and validation
const useCalculatorForm = (
  calculationStrategy = defaultCalculationStrategy
) => {
  const [distance, setDistance] = useState('');
  const [tankCost, setTankCost] = useState('');
  const [tankLiters, setTankLiters] = useState('');
  const [avgSpeed, setAvgSpeed] = useState('');
  const [results, setResults] = useState<{ time: string, cost: string, liters: string } | null>(null);

  const handleCalculate = () => calculateCommand(
    distance,
    tankCost,
    tankLiters,
    avgSpeed,
    calculationStrategy,
    setResults
  );

  return {
    distance, setDistance,
    tankCost, setTankCost,
    tankLiters, setTankLiters,
    avgSpeed, setAvgSpeed,
    results, handleCalculate
  };
};

// Results component for displaying the results
const Results: React.FC<{ results: { time: string, cost: string, liters: string } }> = ({ results }) => (
  <div className={styles.results}>
    <p>Estimated Time: {results.time}</p>
    <p>Fuel Needed: {results.liters}</p>
    <p>Fuel Cost: {results.cost}</p>
    <p className={styles.note}>Fuel price is calculated at $2.50 per liter.</p>
  </div>
);

// Main CalculatorForm component
const CalculatorForm: React.FC = () => {
  const {
    distance, setDistance,
    tankCost, setTankCost,
    tankLiters, setTankLiters,
    avgSpeed, setAvgSpeed,
    results, handleCalculate
  } = useCalculatorForm();

  // create input fields dynamically
  const inputFields = [
    { id: "distance", label: "Distance to travel (km):", value: distance, setValue: setDistance, placeholder: "Enter distance in kilometers" },
    { id: "tankCost", label: "Cost of a full tank of fuel ($):", value: tankCost, setValue: setTankCost, placeholder: "Enter cost of a full tank" },
    { id: "tankLiters", label: "Number of liters in a full tank:", value: tankLiters, setValue: setTankLiters, placeholder: "Enter liters in a full tank" },
    { id: "avgSpeed", label: "Average speed (km/h):", value: avgSpeed, setValue: setAvgSpeed, placeholder: "Enter average speed" }
  ];

  return (
    <div className={styles.formContainer}>
      {inputFields.map(field => createInputField(field.id, field.label, field.value, field.setValue, field.placeholder))}

      <button className={styles.calculateButton} onClick={handleCalculate}>
        Calculate
      </button>

      {results && <Results results={results} />}
    </div>
  );
};

export default CalculatorForm;
