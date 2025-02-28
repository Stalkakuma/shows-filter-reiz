import { useEffect, useState } from "react";
import { getShows } from "../misc/apiShowService";
import { ShowCard } from "../components/ShowCard";
import { ShowType } from "../types";
import { getPaginationButtons } from "../components/helpers/Pagination";
import { FiltersWidget } from "../components/FiltersWidget";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showsData, setShowsData] = useState<ShowType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 8;
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("None");
  const sortingOrders = [
    "None",
    "Name ascending",
    "Name descending",
    "Premiered ascending",
    "Premiered descending",
  ];

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
        show.genres.every((genre) => selectedGenres.includes(genre)))
  );

  const sortedShows =
    sortOrder === "None"
      ? filteredShows
      : [...filteredShows].sort((a, b) =>
          sortOrder === "Name ascending"
            ? a.name.localeCompare(b.name)
            : sortOrder === "Name descending"
            ? b.name.localeCompare(a.name)
            : sortOrder === "Premiered ascending"
            ? Date.parse(a.premiered) - Date.parse(b.premiered)
            : Date.parse(b.premiered) - Date.parse(a.premiered)
        );

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = sortedShows.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.ceil(sortedShows.length / showsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const filteringProps = {
    sortOrder,
    sortingOrders,
    setSortOrder,
    selectedStatus,
    statuses,
    setSelectedStatus,
    selectedGenres,
    allGenres,
    genreToggle,
  };

  return (
    <div className="flex-col  mr-auto ml-auto  max-w-7xl">
      <h1>{isLoading && "Loading..."}</h1>
      {!filteredShows.length && <p>No Matches</p>}
      <FiltersWidget {...filteringProps} />
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
