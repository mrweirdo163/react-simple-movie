import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";
// https://api.themoviedb.org/3/trending/all/day?api_key=
const MovieList = ({ category = "movie", type = "popular", time = "day" }) => {
  const img_path = "https://image.tmdb.org/t/p/original";
  const { data, error } = useSWR(
    type !== "trending"
      ? `https://api.themoviedb.org/3/${category}/${type}?api_key=c0f1c0571c03dffda8ff23bc896915b8`
      : `https://api.themoviedb.org/3/${type}/all/${time}?api_key=c0f1c0571c03dffda8ff23bc896915b8`,
    fetcher
  );
  const loading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      {loading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        </Swiper>
      )}
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {!loading &&
          movies &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} img_path={img_path}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
