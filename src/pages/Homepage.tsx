import { useEffect, useState } from "react";
import { getShows } from "../misc/apiShowService";
import { ShowCard } from "../components/ShowCard";
import { ShowType } from "../types";
import { getPaginationButtons } from "../components/helpers/Pagination";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showsData, setShowsData] = useState<ShowType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 8;
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("None");
  const sortingOrders = ["None", "A → Z", "Z → A"];

  const statuses = ["All", ...new Set(showsData.map((show) => show.status))];
  const allGenres = Array.from(
    new Set(showsData.flatMap((show) => show.genres))
  );

  const genreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const shows = await getShows();
        setShowsData(shows.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredShows = showsData.filter(
    (show) =>
      (selectedStatus === "All" || show.status === selectedStatus) &&
      (selectedGenres.length === 0 ||
        show.genres.some((genre) => selectedGenres.includes(genre)))
  );

  const sortedShows =
    sortOrder === "None"
      ? filteredShows
      : [...filteredShows].sort((a, b) =>
          sortOrder === "A → Z"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = sortedShows.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.ceil(sortedShows.length / showsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-col  mr-auto ml-auto  max-w-7xl">
      <h1>{isLoading && "Loading..."}</h1>
      <section className="flex">
        <div className="relative">
          <select
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            {sortingOrders.map((order) => (
              <option key={order} value={order}>
                {order}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <select
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((showStatus) => (
              <option key={showStatus} value={showStatus}>
                {showStatus}
              </option>
            ))}
          </select>
        </div>

        {/* Multi-Select Dropdown */}
        <div className="relative mb-4">
          <button
            className="w-full px-4 py-2 border rounded text-left flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedGenres.length > 0
              ? selectedGenres.join(", ")
              : "Select Genres"}
            <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute w-full mt-2  border rounded shadow-lg z-10">
              <ul className="max-h-48 overflow-y-auto p-2">
                {allGenres.map((genre) => (
                  <li
                    key={genre}
                    className="flex items-center p-2 hover:bg-gray-200"
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
      </section>
      <section className="grid md:grid-cols-2 grid-cols-1 gap-3">
        {currentShows.map((show: ShowType) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </section>
      <div className="flex justify-center mt-4 space-x-2">
        {getPaginationButtons(totalPages, currentPage).map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-2">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`px-3 py-2 rounded cursor-pointer dark:hover:shadow-dark hover:shadow-light font-medium ${
                currentPage === page
                  ? "bg-active-dark text-dormant-dark"
                  : "dark:bg-dormant-dark bg-dormant-light"
              }`}
              onClick={() => goToPage(page as number)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};
