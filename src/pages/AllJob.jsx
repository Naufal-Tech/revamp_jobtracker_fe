import axios from "axios";
import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { JobContainer, SearchContainer } from "../components";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`, {
      params,
    });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobContext = createContext();

const AllJob = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobContext);

export default AllJob;
