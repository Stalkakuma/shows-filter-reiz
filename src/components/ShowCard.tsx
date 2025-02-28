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
      <div className="max-w-50 min-w-40 p-2">
        <img src={image ? image.medium : NoImage} alt="Show's image" />
      </div>
      <div className="flex flex-col justify-between relative p-4">
        <div>
          <h2>{name}</h2>
          <SummarySanitized summary={summary} isClamped={true} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col dark:brightness-75 dark:opacity-100 opacity-50">
            {rating.average > 0 && (
              <>
                <p>Rating</p>
                <p>
                  {rating.average}
                  <span> / 10</span>
                </p>
              </>
            )}
          </div>
          <ul className="flex items-end gap-1">
            {genres.map((genre, index) => (
              <li
                key={index}
                className="text-sm brightness-50 dark:opacity-100 opacity-65"
              >
                {genre}
                {index !== genres.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
