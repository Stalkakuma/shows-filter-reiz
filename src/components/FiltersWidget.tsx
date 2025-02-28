import { useState } from "react";

type FiltersWidgedProps = {
  sortOrder: string;
  sortingOrders: string[];
  setSortOrder: (e: string) => void;
  selectedStatus: string;
  statuses: string[];
  setSelectedStatus: (e: string) => void;
  selectedGenres: string[];
  allGenres: string[];
  genreToggle: (genre: string) => void;
};

export const FiltersWidget = ({
  sortOrder,
  sortingOrders,
  setSortOrder,
  selectedStatus,
  statuses,
  setSelectedStatus,
  selectedGenres,
  allGenres,
  genreToggle,
}: FiltersWidgedProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //TODO Constistent drowpdown styles
  return (
    <section className="flex md:flex-row flex-col gap-4 mb-5">
      <div className="relative">
        <select
          className="block md:w-full w-50 cursor-pointer px-4 py-2  border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-active-dark focus:border-active-dark"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          {sortingOrders.map((order) => (
            <option
              className="bg-white dark:bg-background-dark "
              key={order}
              value={order}
            >
              {order}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <button
          className="md:w-full w-50 min-w-50 px-4 py-2 border rounded text-left flex justify-between items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {`Selected Genres ${
            selectedGenres.length != 0 ? `(${selectedGenres.length})` : ""
          }`}
          <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute w-full mt-2 bg-white dark:bg-background-dark border rounded shadow-lg z-10">
            <ul className="max-h-48 overflow-y-auto p-2">
              {allGenres.map((genre) => (
                <li
                  key={genre}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => genreToggle(genre)}
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => genreToggle(genre)}
                    className="mr-2"
                  />
                  <span>{genre}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative">
        <select
          className="block md:w-full w-50 px-4 py-2 cursor-pointer border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-active-dark focus:border-active-dark"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map((showStatus) => (
            <option
              className="bg-white dark:bg-background-dark"
              key={showStatus}
              value={showStatus}
            >
              {showStatus}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
