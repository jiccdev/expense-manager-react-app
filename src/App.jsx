import { Fragment, useState, useEffect } from 'react';
import { generateId } from './helpers/index';

import './App.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Layout from './components/Layout/Layout';
import NewBudgetForm from './components/NewBudgetForm/NewBudgetForm';
import ModalBudget from './components/ModalBudget/ModalBudget';
import ExpenseList from './components/ExpenseList/ExpenseList';
import Filters from './components/Filters/Filters';

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses')
      ? JSON.parse(localStorage.getItem('expenses'))
      : []
  );

  const [budget, setBudget] = useState(
    // Quiere decir que si hay algo que primero lo busque
    Number(localStorage.getItem('budget')) ?? 0
  );

  const [isBudgetValid, setIsBudgetValid] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState('');
  const [filtredExpenses, setFiltredExpenses] = useState([]);

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setIsModalActive(true);
    }
  }, [editExpense]);

  const saveExpense = (expense) => {
    if (expense.id) {
      // Update
      const updateExpense = expenses.map((expenseState) =>
        expenseState.id === expense.id ? expense : expenseState
      );
      setExpenses(updateExpense);
      setEditExpense({});
      setIsModalActive(!isModalActive);
    } else {
      // New Expense
      expense.id = generateId();
      expense.date = new Date().toLocaleDateString();

      setExpenses([...expenses, expense]);
      setIsModalActive(!isModalActive);
      setEditExpense({}); //Duda
    }
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  // Se ejecuta cuando cambia presupuesto
  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  // Escucha los cambios que sucedan en filtro, cuando cambio ejecuto esta accion...
  useEffect(() => {
    if (filter) {
      // Filter expense by category
      const filtredExpenses = expenses.filter(
        (expense) => expense.category === filter
      );
      setFiltredExpenses(filtredExpenses);
    }
  }, [filter]);

  // Se ejecuta cuando cambia gastos, es decir cada vez que cambia gastos se va a ejecutra el effect()
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses]);

  // Se ejecuta una vez, cuando carga la aplicacion
  useEffect(() => {
    const budgetLocalStorage = Number(localStorage.getItem('budget')) ?? 0;

    if (budgetLocalStorage > 0) {
      setIsBudgetValid(true);
    }
  }, []);

  // ?? significa que no si no lo encuentro
  // El array vacio es porque solo va cargar una vez
  return (
    <Layout>
      <NewBudgetForm
        budget={budget}
        setBudget={setBudget}
        isBudgetValid={isBudgetValid}
        setIsBudgetValid={setIsBudgetValid}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <Fragment>
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 w-96 mt-10 rounded-md "
          role="alert"
        >
          <p className="font-bold">Informational message</p>
          <ul className="text-sm">
            Each record has two 3 key actions:
            <li>
              {' '}
              1.- Create a new expense from the plus sign, located on the left
              side.
            </li>
            <li>
              2.- Edit, this action is executed when you move the mouse cursor
              to the right over the record.
            </li>
            <li>
              3.- Delete, this action is executed when you move the mouse cursor
              to the left over the record.
            </li>
          </ul>
        </div>
        <main className="flex flex-col justify-center items-center ">
          {isBudgetValid ? (
            <Filters filter={filter} setFilter={setFilter} />
          ) : null}
          {isBudgetValid ? (
            <>
              <main className="w-screen px-10">
                <ExpenseList
                  expenses={expenses}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                  filter={filter}
                  filtredExpenses={filtredExpenses}
                />
                <AiOutlinePlusCircle
                  onClick={() => setIsModalActive(true)}
                  className="absolute bottom-80 right-10 sm:right-14 sm:top-96 lg:bottom-10 cursor-pointer text-4xl text-cyan-500"
                />
              </main>
            </>
          ) : null}
        </main>
      </Fragment>
      {/* Showing New Modal  */}
      {isModalActive ? (
        <ModalBudget
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      ) : null}
    </Layout>
  );
}

export default App;
