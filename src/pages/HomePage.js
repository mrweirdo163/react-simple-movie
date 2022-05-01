import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="pb-10 mb-5movies-layout page-container">
        <div className="flex items-center mb-10 text-white gap-x-4">
          <h2
            className="font-bold capitalize "
            style={{
              fontSize: "min(1.3em, 5vw)",
            }}
          >
            What's Popular
          </h2>
        </div>
        <MovieList type={"popular"}></MovieList>
      </section>
      <section className="p-8 pb-10 mb-5 rounded-xl movies-layout page-container bg-slate-600">
        <div className="flex items-center mb-10 text-white gap-x-4">
          <h2
            className="font-bold capitalize"
            style={{
              fontSize: "min(1.3em, 5vw)",
            }}
          >
            Top rated
          </h2>
        </div>
        <MovieList type={"top_rated"}></MovieList>
      </section>
      <section className="pb-10 mt-10 movies-layout page-container">
        <h2
          className="mb-10 font-bold text-white capitalize"
          style={{
            fontSize: "min(1.3em, 5vw)",
          }}
        >
          Trending
        </h2>
        <MovieList category={"tv"} type={"trending"} time={"day"}></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
