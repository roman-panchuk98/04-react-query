import fetchMovies from "../../services/movieService";
import css from "./App.module.css";

import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = (query: string) => {
    setSearchWord(query);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setMovies([]);
        setIsLoading(true);
        setIsError(false);

        const response = await fetchMovies(searchWord);
        if (response.length === 0) {
          return toast.error("No movies found for your request.");
        }

        setMovies(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (searchWord.trim() !== "") {
      fetchData();
    }
  }, [searchWord]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid movies={movies} onSelect={openModal} />
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
