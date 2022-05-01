import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
import { APIProvider, useAPI } from "../contexts/api-context";
import { useFetchingApi } from "../hooks/useFetchingApi";
import { useFetchingInfo } from "../hooks/useFetchingInfo";
const img_path = "https://image.tmdb.org/t/p/original";

const MovieDetailsPage = () => {
  const { loading } = useFetchingApi();
  return (
    <>
      {loading && (
        <div className="w-10 h-10 mx-auto border-4 rounded-full border-t-transparent animate-spin border-primary"></div>
      )}
      {!loading && (
        <>
          <APIProvider>
            <Poster></Poster>
            <MovieItem></MovieItem>
          </APIProvider>
        </>
      )}
    </>
  );
};

const Poster = () => {
  const { data } = useAPI();
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black overlay bg-opacity-30"></div>
      {data?.backdrop_path && (
        <img
          src={`${img_path + data?.backdrop_path}`}
          alt=""
          className="object-cover w-full h-full "
        />
      )}
      {!data?.backdrop_path && (
        <div
          className="h-[600px] text-4xl text-center text-white flex items-center justify-center bg-slate-600"
          style={{
            height: "min(600px, 70vw)",
            fontSize: "min(2.7em, 6vw)",
          }}
        >
          We dont't have this movie's background picture
        </div>
      )}
      <div className="absolute z-10 w-3/5 left-2/4 -translate-x-2/4 -translate-y-2/4 poster">
        <img
          src={`${img_path + data?.poster_path}`}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const MovieItem = () => {
  const { data } = useAPI();
  const genres = data?.genres;
  return (
    <div className="page-container-movie">
      <h1 className="text-3xl font-semibold text-center text-white">
        {data?.original_title || data?.original_name}
      </h1>
      <div className="flex items-center my-10 justify-evenly page-container-movie">
        {genres &&
          genres.map((item) => (
            <span
              key={item.id}
              className="font-semibold border-2 rounded-full text-primary border-primary"
              style={{
                fontSize: "min(.7em, 2vw)",
                padding: "min(10px, 2vw) min(20px, 3vw)",
              }}
            >
              {item.name}
            </span>
          ))}
      </div>
      <p
        className="px-5 mb-10 text-center text-white"
        style={{
          fontSize: "min(1em, 3vw)",
        }}
      >
        {data?.overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <SimilarMovies></SimilarMovies>
    </div>
  );
};

const MovieCredits = () => {
  const { data } = useFetchingInfo("credits");
  const casts = data?.cast;
  console.log(data);
  return (
    <div className="page-container-casts">
      <h2 className="mb-10 text-2xl font-semibold text-center text-white">
        Casts
      </h2>
      <div className="grid gap-10 cast-grid">
        {casts &&
          casts.slice(0, 4).map((item) => (
            <div className="relative" key={item.id}>
              <div className="rounded-md w-full h-[350px]">
                {item?.profile_path && (
                  <img
                    src={`${img_path + item?.profile_path}`}
                    alt=""
                    className="object-cover w-full h-full rounded-md"
                  />
                )}
                {!item.profile_path && (
                  <div className="flex items-center justify-center w-full h-full text-center border-2 rounded-md text-slate-600 border-slate-600">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-17-512.png"
                      alt=""
                      className="object-cover w-full h-[60%] rounded-md"
                    />
                  </div>
                )}
              </div>
              <h3 className="p-3 text-center text-white">{item?.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

const MovieVideo = () => {
  const { data } = useFetchingInfo("videos");
  if (!data) return null;
  const results = data?.results;
  console.log(data);

  return (
    <div className="py-10">
      {results.slice(0, 1).map((item) => (
        <div key={item.id} className="w-full aspect-video">
          <iframe
            className="object-cover w-full h-full"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

const SimilarMovies = () => {
  const { data } = useFetchingInfo("similar");
  if (!data) return null;
  const results = data?.results;
  return (
    <div className="py-10">
      <h2
        className="mb-5 text-2xl font-medium text-white"
        style={{
          fontSize: "min(1.6em, 4.6vw)",
        }}
      >
        Similar Movies
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} img_path={img_path}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
