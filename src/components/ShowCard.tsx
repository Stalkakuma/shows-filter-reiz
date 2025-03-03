import { ShowType } from "../types";
import { SummarySanitized } from "./helpers/SummarySanitized";
import NoImage from "../assets/No_Image.jpg";
import { useNavigate } from "react-router";
import { useUserContext } from "../misc/UserContext";
import Heart from "../assets/heart.svg?react";
import { ShowSkeleton } from "./ShowSkeleton";

type ShowProps = {
  show: ShowType;
  isLoading?: boolean;
};

export const ShowCard = ({ show, isLoading }: ShowProps) => {
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

  if (isLoading) {
    return <ShowSkeleton />;
  }

  return (
    <div className="flex min-h-60 z-10  rounded-sm dark:hover:shadow-dark hover:duration-80 hover:ease-in-out hover:shadow-light">
      <div
        className="h-full min-w-40 md:p-2 p-1 cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          className="w-full h-full object-cover"
          src={image?.medium || NoImage}
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
          <div className="flex min-w-10 flex-col dark:brightness-75 dark:opacity-100 opacity-50">
            {rating.average > 0 && (
              <div className="flex flex-col md:text-sm sm:text-[10px] text-[10px]">
                <p>Rating</p>
                <p>{rating.average} / 10</p>
              </div>
            )}
          </div>
          <ul className="flex min-w-12 items-end md:gap-1 gap-0.5 ">
            {genres.map((genre, index) => (
              <li key={index}>
                <p className="md:text-[10px] sm:text-[8px] text-[8px] brightness-50 dark:opacity-100 opacity-65">
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
