import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";

export const useFetchingInfo = (type) => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/${type}?api_key=c0f1c0571c03dffda8ff23bc896915b8`,
    fetcher
  );

  return { data };
};
