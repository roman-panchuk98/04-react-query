import axios from "axios";

import type { Movie } from "../types/movie";

export type MovieHttpResponse = {
  results: Movie[];
};

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
}
