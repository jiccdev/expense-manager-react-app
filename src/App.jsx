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
        <main className="">
          {isBudgetValid ? (
            <Filters filter={filter} setFilter={setFilter} />
          ) : null}
          {isBudgetValid ? (
            <>
              <main className="w-screen px-20 overflow-auto">
                <ExpenseList
                  expenses={expenses}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                  filter={filter}
                  filtredExpenses={filtredExpenses}
                />
              </main>
              <AiOutlinePlusCircle
                onClick={() => setIsModalActive(true)}
                className="absolute bottom-20 right-10 cursor-pointer text-4xl text-cyan-500"
              />
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
