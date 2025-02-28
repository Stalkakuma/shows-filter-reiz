import { ShowType } from "../types";
import { SummarySanitized } from "./helpers/SummarySanitized";
import NoImage from "../assets/No_Image.jpg";
import { useNavigate } from "react-router";

type ShowProps = {
  show: ShowType;
};

export const ShowCard = ({ show }: ShowProps) => {
  const { id, name, image, summary, rating, genres } = show;
  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`show/${id}`);
  };
  return (
    <div
      className="flex cursor-pointer rounded-sm dark:hover:shadow-dark hover:shadow-light"
      onClick={handleNavigate}
    >
      <div className="md:min-w-35 sm:min-w-25 min-w-35 p-2">
        <img src={image ? image.medium : NoImage} alt="Show's image" />
      </div>
      <div className="flex flex-col justify-between relative md:p-4 p-1">
        <div>
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
