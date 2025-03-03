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
      <div className="flex flex-col justify-between md:p-2 p-1">
        <div>
          <div className="flex justify-between">
            <h2 className="cursor-pointer" onClick={handleNavigate}>
              {name}
            </h2>
            <button
              onClick={handleFavorite}
              className="cursor-pointer place-self-start z-20 p-2"
            >
              <Heart
                className={`${
                  isFavorite
                    ? "stroke-active-dark fill-active-dark hover:fill-none hover:stroke-heart-stroke"
                    : "stroke-heart-stroke dark:fill-none"
                } dark:fill-heart-filled hover:fill-active-dark hover:stroke-active-dark hover:duration-400 hover:ease-in`}
              />
            </button>
          </div>
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
