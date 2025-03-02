import { ShowType } from "../types";
import { SummarySanitized } from "./helpers/SummarySanitized";
import NoImage from "../assets/No_Image.jpg";
import { useNavigate } from "react-router";
import { useUserContext } from "../misc/UserContext";
import Heart from "../assets/heart.svg?react";

type ShowProps = {
  show: ShowType;
};

export const ShowCard = ({ show }: ShowProps) => {
  const { id, name, image, summary, rating, genres } = show;
  const { user, addToFavorites, removeFromFavorites } = useUserContext();
  const isFavorite = user.favorites.includes(id);
  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/show/${id}`);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return (
    <div className="flex z-10  rounded-sm dark:hover:shadow-dark hover:shadow-light">
      <div
        className="md:w-35 sm:min-w-35 min-w-35 md:p-2 p-1  cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          className="w-fit"
          src={image ? image.medium : NoImage}
          alt="Show's image"
        />
      </div>
      <div className="flex flex-col justify-between relative md:p-2 p-1">
        <button
          onClick={handleFavorite}
          className="absolute cursor-pointer top-0 right-0 z-20 p-2"
        >
          <Heart
            className={`${
              isFavorite
                ? "stroke-active-dark fill-active-dark"
                : "stroke-heart-stroke dark:fill-none"
            } dark:fill-heart-filled`}
          />
        </button>
        <div className="cursor-pointer md:mr-0 mr-4" onClick={handleNavigate}>
          <h2>{name}</h2>
          <SummarySanitized summary={summary} isClamped={true} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col dark:brightness-75 dark:opacity-100 opacity-50">
            {rating.average > 0 && (
              <div className="flex flex-col">
                <p>Rating</p>
                <p>{rating.average} / 10</p>
              </div>
            )}
          </div>
          <ul className="flex items-end md:gap-1 gap-0.5 ">
            {genres.map((genre, index) => (
              <li key={index}>
                <p className="md:text-sm sm:text-sm text-xs brightness-50 dark:opacity-100 opacity-65">
                  {genre}
                  {index !== genres.length - 1 ? ", " : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
