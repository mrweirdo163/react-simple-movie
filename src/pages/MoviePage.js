import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const MoviePage = () => {
  const itemsPerPage = 20;
  const [currentItems, setCurrentItems] = useState(null);
  const img_path = "https://image.tmdb.org/t/p/original";
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=c0f1c0571c03dffda8ff23bc896915b8&page=${page}`
  );
  const { data, error } = useSWR(url, fetcher);
  const movies = data?.results;
  const loading = !data && !error;
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [itemOffset, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };
  useEffect(() => {
    if (queryDebounce)
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=c0f1c0571c03dffda8ff23bc896915b8&query=${queryDebounce}&page=${page}`
      );
    else
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=c0f1c0571c03dffda8ff23bc896915b8&page=${page}`
      );
  }, [queryDebounce, page]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter your movie..."
            className="w-full p-4 text-sm text-white rounded-md outline-none bg-slate-800"
            onChange={handleFilterChange}
          />
        </div>
        <button className="px-4 py-1 text-white rounded-md bg-primary">
          <i className="text-2xl bx bx-search"></i>
        </button>
      </div>
      <div className="grid gap-10 mb-10 movie-page">
        {loading &&
          new Array(20)
            .fill(0)
            .map((item, index) => (
              <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
            ))}
        {!loading &&
          movies &&
          movies.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              img_path={img_path}
            ></MovieCard>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </>
  );
};

export default MoviePage;
