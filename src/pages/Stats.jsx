import axios from "axios";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { ChartContainer, StatsContainer } from "../components";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/jobs/stats`
    );
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard");
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length >= 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
