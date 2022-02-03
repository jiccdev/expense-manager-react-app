const Filters = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center justify-center my-4 text-white">
      <form>
        <div className="">
          <label className="">Filter expenses:</label>
          <select
            id="categoryInput"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      </form>
    </div>
  );
};

export default Filters;
