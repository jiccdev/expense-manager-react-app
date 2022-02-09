const Filters = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center justify-center my-10 text-white">
      <form>
        <div>
          <label className="text-slate-300">Filter expenses</label>
          <select
            id="categoryInput"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-96 border text-sm rounded-lg  block p-2.5 text-white border-gray-300 bg-gray-700"
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
