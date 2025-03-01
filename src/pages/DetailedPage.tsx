import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ShowType } from "../types";
import { getSpecificShow } from "../misc/apiShowService";
import { SummarySanitized } from "../components/helpers/SummarySanitized";
import { formatDate } from "../components/helpers/misc";
import { useUserContext } from "../misc/UserContext";

export const DetailedPage = () => {
  const { id } = useParams();
  const [showData, setShowData] = useState<ShowType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, addToFavorites, removeFromFavorites } = useUserContext();
  const isFavorite = user.favorites.includes(parseInt(id as string));

  useEffect(() => {
    const getShowData = async () => {
      setIsLoading(true);
      try {
        const response = await getSpecificShow(id as string);
        setShowData(response.data);
      } catch (error) {
        console.error("Error getting show data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getShowData();
  }, [id]);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(parseInt(id as string));
    } else {
      addToFavorites(parseInt(id as string));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:grid-rows-2 sm:grid-rows-2 row-auto">
      <div className="col-start-1 md:row-span-2 p-4">
        <img src={showData?.image.original} alt="Show's Image" />
      </div>
      <div className="flex md:gap-8 gap-5 md:col-span-2 col-span-1 md:col-start-2 sm:col-start-2 col-start-1 flex-col p-4">
        <div>
          <h1>{showData?.name}</h1>
          <button
            className={`cursor-pointer underline ${
              isFavorite ? "text-active-dark" : ""
            }`}
            onClick={handleFavorite}
          >
            {isFavorite ? "FAVORITE" : "ADD TO FAVORITES"}
          </button>
        </div>
        <SummarySanitized
          summary={showData?.summary as string}
          isClamped={false}
        />
      </div>
      <div className="md:row-start-2 md:col-start-2  md:place-content-end p-4">
        {showData?.premiered && (
          <p>Premiered: {formatDate(showData.premiered)}</p>
        )}
        {showData?.ended && <p>Ended: {formatDate(showData.ended)}</p>}
        {showData?.averageRuntime && (
          <p>Average runtime: {showData.averageRuntime} minutes</p>
        )}
        {showData?.status && <p>Show's status: {showData.status}</p>}
        {showData?.language && <p>Language: {showData.language}</p>}
        {showData?.rating && <p>Average rating: {showData.rating.average}</p>}
        {showData?.officialSite && (
          <p>
            Official site:{" "}
            <a
              className="underline text-active-dark"
              href={showData.officialSite}
              target="_blank"
            >
              Go to official site
            </a>
          </p>
        )}
        {showData?.genres && (
          <ul className="flex gap-1">
            {showData.genres.map((genre, index) => (
              <li key={index}>
                {genre}
                {index !== showData.genres.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
