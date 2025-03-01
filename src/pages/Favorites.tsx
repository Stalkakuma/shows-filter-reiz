import { useEffect, useState } from "react";
import { ShowList } from "../components/ShowList";
import { getShows } from "../misc/apiShowService";
import { ShowType } from "../types";
import { useUserContext } from "../misc/UserContext";
import { NavLink } from "react-router";

export const Favorites = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showsData, setShowsData] = useState<ShowType[]>([]);
  const [favoriteShows, setFavoriteShows] = useState<ShowType[]>([]);
  const userFavoriteList = user.favorites;

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

  useEffect(() => {
    const updatedShowList = showsData.filter((show) =>
      userFavoriteList.includes(show.id)
    );
    setFavoriteShows(updatedShowList);
  }, [userFavoriteList, showsData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoading && userFavoriteList.length === 0) {
    return (
      <p>
        Looks like you have no favorites yet!{" "}
        <NavLink className="text-active-dark underline" to="/">
          Visit
        </NavLink>{" "}
        our shows page to add some.
      </p>
    );
  }

  return <ShowList shows={favoriteShows} />;
};
