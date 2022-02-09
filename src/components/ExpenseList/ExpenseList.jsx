import Expense from '../Expense/Expense';

const ExpenseList = ({
  expenses,
  setEditExpense,
  deleteExpense,
  filter,
  filtredExpenses,
}) => {
  return (
    <div className="flex flex-col h-auto p-5 my-5 bg-slate-200 rounded-lg shadow-lg sm:overflow-auto border w-full border-slate-700">
      <h2>{expenses.length ? 'Expenses' : 'No expenses'}</h2>

      <div className="my-2" />
      {expenses.length ? (
        <table className="table-auto">
          <thead>
            <tr className="flex flex-row items-center justify-around border-b border-slate-300 py-2 bg-slate-300">
              <th>Expense</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="overflow-scroll">
                {filter
                  ? filtredExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex flex-row items-center justify-around"
                      >
                        <Expense
                          id={expense.id}
                          expense={expense.expense}
                          quantity={expense.quantity}
                          category={expense.category}
                          date={expense.date}
                          setEditExpense={setEditExpense}
                          deleteExpense={deleteExpense}
                        />
                      </div>
                    ))
                  : expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex flex-row justify-around items-center overflow-auto"
                      >
                        <Expense
                          id={expense.id}
                          expense={expense.expense}
                          quantity={expense.quantity}
                          category={expense.category}
                          date={expense.date}
                          setEditExpense={setEditExpense}
                          deleteExpense={deleteExpense}
                        />
                      </div>
                    ))}
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ExpenseList;
