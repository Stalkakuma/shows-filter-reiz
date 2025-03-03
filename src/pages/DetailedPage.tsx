import { useParams } from "react-router";
import { PropsWithChildren, useEffect, useState } from "react";
import { ShowType } from "../types";
import { getSpecificShow } from "../misc/apiShowService";
import { SummarySanitized } from "../components/helpers/SummarySanitized";
import { formatDate } from "../components/helpers/misc";
import { useUserContext } from "../misc/UserContext";
import NoImage from "../assets/No_Image.jpg";

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

  const DetailedSection = ({ children }: PropsWithChildren) => (
    <section className="grid place-self-center md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-[auto_auto]">
      {children}
    </section>
  );

  if (isLoading) {
    return (
      <DetailedSection>
        <div className="md:col-start-2 place-content-center w-10 h-10 border-4 border-t-transparent border-active-dark rounded-full animate-spin"></div>
      </DetailedSection>
    );
  }

  return (
    <DetailedSection>
      <div className="col-start-1  md:row-span-2 md:p-2 p-1">
        <img
          className="min-h-full w-full h-full object-cover md:rounded-lg"
          src={showData?.image?.original || NoImage}
          alt="Show's Image"
        />
      </div>
      <div className="flex md:gap-8 gap-5 md:col-span-2 col-span-1 md:col-start-2 sm:col-start-2 col-start-1 flex-col sm:py-0 px-1 py-2 md:p-2">
        <div>
          <h1>{showData?.name}</h1>
          <button
            className={`cursor-pointer underline brightness-50 hover:text-active-dark hover:brightness-120 hover:duration-300 hover:ease-in ${
              isFavorite ? "text-active-dark brightness-100 " : ""
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
      <div className="md:row-start-2 md:col-start-2 md:place-content-end md:p-2 p-1">
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
              className="underline text-active-dark hover:brightness-120 hover:duration-300 hover:ease-in"
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
    </DetailedSection>
  );
};
