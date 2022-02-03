import React from 'react';

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

const Expense = ({
  id,
  expense,
  quantity,
  category,
  date,
  setEditExpense,
  deleteExpense,
}) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          setEditExpense({ id, expense, quantity, category, date })
        }
        className="bg-blue-600 flex text-slate-200 p-2"
      >
        Edit
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => deleteExpense(id)}
        className="bg-red-600 text-slate-200 p-2"
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-slate-200 flex items-center justify-between w-full border-b border-slate-300 p-2">
          <div className="">{expense}</div>
          <div className="">{quantity}</div>
          <div className="">{category}</div>
          <div className="">{date}</div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
