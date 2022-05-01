import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";

export const useFetchingApi = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=c0f1c0571c03dffda8ff23bc896915b8`,
    fetcher
  );
  const loading = !data && !error;

  return { data, loading };
};
