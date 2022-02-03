import { useState, useEffect } from 'react';

import MessageForms from '../MessageForms/MessageForms';

import { IoClose } from 'react-icons/io5';

const ModalBudget = ({
  isModalActive,
  setIsModalActive,
  saveExpense,
  editExpense,
  setEditExpense,
}) => {
  const [message, setMessage] = useState('');

  const [expense, setExpense] = useState('');
  const [quantity, setQuanity] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setExpense(editExpense.expense);
      setQuanity(editExpense.quantity);
      setCategory(editExpense.category);
      setId(editExpense.id);
      setDate(editExpense.date);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([expense, quantity, category].includes('')) {
      setMessage('All fields are required');

      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
    saveExpense({ expense, quantity, category, id, date });
  };

  const hideModal = () => {
    setIsModalActive(!isModalActive);
    setEditExpense({});
  };

  return (
    <div className="flex flex-col min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-slate-300 bg-opacity-70">
      <div className="bg-slate-100 p-5 rounded-lg text-center">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-start text-slate-800 font-semibold">
            {editExpense.expense ? 'Edit Budget' : 'New Budget'}
          </h2>
          <IoClose
            onClick={hideModal}
            className="cursor-pointer text-slate-600"
          />
        </div>
        <div className="w-full border-t border-slate-200 my-2" />

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-6">
            <label
              htmlFor="nameExpenseInput"
              className="block mb-2 text-xs font-sm text-start text-gray-600"
            >
              Name of expense
            </label>
            <input
              type="text"
              id="nameExpenseInput"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              className="text-sm rounded-lg block w-80 p-2.5 focus:outline-none focus:shadow-outline focus:border-blue-300 bg-slate-50 border border-slate-300 text-slate-800 "
              placeholder="Add a name of expense"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="quantityInput"
              className="block mb-2 text-xs font-sm text-start text-gray-600"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantityInput"
              value={quantity}
              onChange={(e) => setQuanity(Number(e.target.value))}
              className="text-sm rounded-lg block w-80 p-2.5 focus:outline-none focus:shadow-outline focus:border-blue-300 bg-slate-50 border border-slate-300 text-slate-800 "
              placeholder="Add a expense quantity ej.200"
              required
            />
          </div>

          <div className="my-4 pb-5 ">
            <label
              htmlFor="categoryInput"
              className="block mb-2 text-xs font-sm text-start text-gray-600"
            >
              Category
            </label>
            <select
              id="categoryInput"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select an option --</option>
              <option value="savings">Savings</option>
              <option value="home">Home</option>
              <option value="health">Health</option>
              <option value="food">Food</option>
              <option value="pets">Pets</option>
              <option value="subscriptions">Subscriptions</option>
            </select>
          </div>
          {message && <MessageForms>{message}</MessageForms>}

          <button
            type="submit"
            className="w-full rounded-md text-sm p-1.5 bg-blue-700 text-slate-200 hover:bg-blue-800"
          >
            {editExpense.expense ? 'Save Changes' : 'Add Budget'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalBudget;
