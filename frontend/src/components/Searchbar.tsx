import useQueryContext from "../hooks/useQueryContext";

// credit https://preline.co/examples.html

export const Searchbar = () => {
  const { query, dispatch } = useQueryContext();

  return (
    <div className="mx-3">
      <label htmlFor="icon" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        <input
          type="text"
          id="icon"
          name="icon"
          className="py-2 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 "
          placeholder="Search"
          value={query}
          onChange={(e) =>
            dispatch({ type: "SET_QUERY", payload: e.target.value })
          }
        />
      </div>
    </div>
  );
};
