export interface ShowType {
  id: number;
  averageRuntime: number;
  name: string;
  summary: string;
  status: string;
  premiered: string;
  ended: string;
  language: string;
  officialSite: string;
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
  genres: string[];
}
