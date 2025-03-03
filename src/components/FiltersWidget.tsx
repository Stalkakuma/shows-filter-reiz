import { useState } from "react";
import Carret from "../assets/caret.svg?react";

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

type ButtonProps = {
  buttonValue: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buttonIsSort?: boolean;
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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSelectGenresOpen, setIsSelectGenresOpen] = useState(false);
  const [isSelectStatusOpen, setIsSelectStatusOpen] = useState(false);

  const Button = ({
    buttonValue,
    isOpen,
    setIsOpen,
    buttonIsSort,
  }: ButtonProps) => {
    const handleDropdown = () => {
      setIsOpen(!isOpen);
    };
    return (
      <button
        className="md:w-full flex justify-between dark:bg-dormant-dark bg-dormant-light  cursor-pointer  min-w-50 px-4 py-2 focus:ring-2 focus:ring-active-dark hover:border-active-dark border rounded-lg text-left"
        onClick={handleDropdown}
      >
        {buttonValue}
        {buttonIsSort && (
          <Carret
            className={`${
              isOpen ? "transform-flat rotate-x-180" : ""
            } max-w-5 h-5 dark:stroke-white`}
          />
        )}
      </button>
    );
  };

  return (
    <section className="flex min-h-20 sm:flex-row md:flex-row flex-col md:gap-4 sm:gap-2 gap-2 py-4">
      <div className="relative">
        <Button
          buttonValue={sortOrder}
          setIsOpen={setIsSortOpen}
          isOpen={isSortOpen}
          buttonIsSort={true}
        />
        {isSortOpen && (
          <div className="absolute w-full min-w-60 z-30 mt-2  bg-white dark:bg-background-dark border-2 rounded-xl shadow-lg overflow-hidden">
            <ul>
              {sortingOrders.map((order) => (
                <li
                  key={order}
                  className="flex items-center p-2 cursor-pointer  hover:bg-dropdown-active hover:text-white"
                  onClick={() => (setSortOrder(order), setIsSortOpen(false))}
                >
                  {order}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative">
        <Button
          buttonValue={`Selected Genres ${
            selectedGenres.length != 0 ? `(${selectedGenres.length})` : ""
          }`}
          isOpen={isSelectGenresOpen}
          setIsOpen={setIsSelectGenresOpen}
        />

        {isSelectGenresOpen && (
          <div className="absolute w-full min-w-60 z-30 mt-2  bg-white dark:bg-background-dark border-2 rounded-xl shadow-lg overflow-hidden">
            <ul className="max-h-50 overflow-y-auto ">
              {allGenres.map((genre) => (
                <li
                  key={genre}
                  className="flex items-center p-2 cursor-pointer  hover:bg-dropdown-active hover:text-white"
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
        <Button
          buttonValue={selectedStatus}
          isOpen={isSelectStatusOpen}
          setIsOpen={setIsSelectStatusOpen}
        />
        {isSelectStatusOpen && (
          <div className="absolute w-full min-w-60 z-30 mt-2  bg-white dark:bg-background-dark border-2 rounded-xl shadow-lg overflow-hidden">
            <ul>
              {statuses.map((status) => (
                <li
                  key={status}
                  className="flex items-center p-2 cursor-pointer  hover:bg-dropdown-active hover:text-white"
                  onClick={() => (
                    setSelectedStatus(status), setIsSelectStatusOpen(false)
                  )}
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
