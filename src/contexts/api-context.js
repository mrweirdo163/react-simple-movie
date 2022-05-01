import { createContext, useContext } from "react";
import { useFetchingApi } from "../hooks/useFetchingApi";

const APIContext = createContext();

function APIProvider(props) {
  const { data, loading } = useFetchingApi();

  const value = { data, loading };
  return <APIContext.Provider value={value} {...props}></APIContext.Provider>;
}

function useAPI() {
  const context = useContext(APIContext);
  if (typeof context === "undefined") throw new Error("abc");

  return context;
}

export { useAPI, APIProvider };
