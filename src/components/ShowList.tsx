import { ShowType } from "../types";
import { ShowCard } from "./ShowCard";

type ShowListProps = {
  shows: ShowType[];
  isLoading?: boolean;
};

export const ShowList = ({ shows, isLoading }: ShowListProps) => {
  return (
    <section className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 md:gap-3 sm:gap-2 gap-1">
      {shows.map((show: ShowType) => (
        <ShowCard key={show.id} show={show} isLoading={isLoading} />
      ))}
    </section>
  );
};
