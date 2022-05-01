import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton";

const MovieCard = ({ item, img_path }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-3 rounded-lg bg-slate-800 movie-card">
      <img
        src={`${img_path + item.poster_path || item.backdrop_path}`}
        alt=""
        className="object-cover w-full mb-3 rounded-lg movie-card-img"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-sm font-medium text-white">
          {item.original_title || item.original_name}
        </h3>
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs text-[#999]">
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </span>
          <span className="text-xs text-[#999] flex items-center gap-x-2">
            {item.vote_average.toFixed(1)} ✨
          </span>
        </div>
        <button
          className="flex items-center justify-center w-full py-2 mt-auto font-medium text-white rounded-lg px-7 bg-primary gap-x-2"
          onClick={() => navigate(`/movies/${item.id}`)}
          style={{
            fontSize: "min(1em, 3vw)",
          }}
        >
          Watch now
          <i className="text-2xl bx bx-play-circle"></i>
        </button>
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col p-3 rounded-lg bg-slate-800 movie-card">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-sm font-medium text-white">
          <LoadingSkeleton
            width="100%"
            height="20px"
            radius="0px"
          ></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 opacity-50">
          <span>
            <LoadingSkeleton
              width="50px"
              height="10px"
              radius="0px"
            ></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton
              width="30px"
              height="10px"
              radius="0px"
            ></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="40px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};

export default MovieCard;
