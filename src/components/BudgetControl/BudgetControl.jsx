import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({
  budget,
  expenses,
  setBudget,
  setExpenses,
  setIsBudgetValid,
}) => {
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Cada vez que los gastos cambien el effect se ejecuta
  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => expense.quantity + total,
      0
    );
    const totalAvailable = budget - totalSpent;

    setAvailable(totalAvailable);
    setSpent(totalSpent);

    // Calculate percentage
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );

    setTimeout(() => {
      setPercentage(newPercentage);
    }, 300);
  }, [expenses]);

  const formatQuantity = (quantity) => {
    return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };

  const handleResetApp = () => {
    const result = confirm('Do you witch new Budget and Expense');

    if (result) {
      setExpenses([]);
      setBudget(0);
      setIsBudgetValid(false);
    }
  };

  return (
    <div className="container flex flex-col">
      <div>
        <h2 className="text-xl text-start text-slate-400 pb-4">
          Budget Control
        </h2>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-1 gap-6 text-slate-200 px-10 sm:px-1">
        <div className="w-auto">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor: 'yellowgreen',
              trailColor: 'whitesmoke',
              textSize: '10px',
            })}
            text={`${percentage}% Spend`}
          />
        </div>

        <div className="grid grid-rows-3 w-auto md:grid-rows-1 ">
          <button
            onClick={handleResetApp}
            className="bg-blue-500 rounded-md text-base shadow-lg "
          >
            Reset App
          </button>
          <div>
            <p className="text-green-300">
              <span className="text-slate-200 font-semibold mr-2">Budget:</span>
              {formatQuantity(budget)}
            </p>
          </div>

          <div>
            <p className="text-yellow-300">
              <span className="text-slate-200 font-semibold mr-2">
                Available expense:
              </span>
              {formatQuantity(available)}
            </p>
          </div>

          <div>
            <p className="text-red-400">
              <span className="text-slate-200 font-semibold mr-2">Spent:</span>
              {formatQuantity(spent)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BudgetControl;
