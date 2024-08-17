import CalculatorForm from '../components/CalculatorForm';
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>🚗 Travel Calculator 🕒</h1>
      <CalculatorForm />
    </div>
  );
}
