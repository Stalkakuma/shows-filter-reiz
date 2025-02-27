export interface ShowType {
  id: number;
  averageRuntime: number;
  name: string;
  summary: string;
  status: string;
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
  genres: string[];
}
