import { useState } from 'react';

import MessageForms from '../MessageForms/MessageForms';
import BudgetControl from '../BudgetControl/BudgetControl';

const NewBudgetForm = ({
  budget,
  setBudget,
  isBudgetValid,
  setIsBudgetValid,
  expenses,
  setExpenses,
}) => {
  const [message, setMessage] = useState('');

  // Handling Budget Form
  const handleBudgetForm = (e) => {
    // Prevent default action form
    e.preventDefault();

    const parseBudgetInputType = Number(budget);

    if (!parseBudgetInputType || parseBudgetInputType < 0) {
      setMessage('Is not a valid value');
      return;
    }
    setMessage('');
    setIsBudgetValid(true);
  };

  return (
    <main className="flex justify-start flex-col h-auto w-auto p-5 bg-gray-800 rounded-lg shadow-lg sm:mx-4 border border-slate-700">
      <h2 className="text-xl text-center text-slate-200 font-semibold">
        New Budget
      </h2>
      <div className="w-full border-t border-slate-700 my-4" />

      {isBudgetValid ? (
        <BudgetControl
          budget={budget}
          expenses={expenses}
          setExpenses={setExpenses}
          setBudget={setBudget}
          setIsBudgetValid={setIsBudgetValid}
        />
      ) : (
        <form className="px-5" onSubmit={handleBudgetForm}>
          <div className="mb-6">
            <label
              htmlFor="budgetInput"
              className="block mb-2 text-sm font-medium text-slate-200 dark:text-slate-300"
            >
              Your budget
            </label>
            <input
              type="number"
              id="budgetInput"
              name="budget"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none outline-none"
              placeholder="$0.00"
              required
            />
          </div>
          {message && <MessageForms>{message}</MessageForms>}
          <button
            type="submit"
            className="w-full text-center p-2 rounded-md shadow-lg outline-0 cursor:pointer bg-slate-600 text-base text-slate-200 font-semibold hover:bg-slate-700"
          >
            Add
          </button>
        </form>
      )}
    </main>
  );
};

export default NewBudgetForm;
