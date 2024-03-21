import axios from "axios";
import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobContext } from "../pages/AllJob";
import Job from "./Job";
import PageButtonContainer from "./PageButtonContainer";

const JobContainer = () => {
  const { data } = useAllJobContext();
  const { totalJobs, numOfPages } = data;

  const [jobs, setJobs] = useState(data?.jobs || []);
  const [contextData, setContextData] = useState(data);

  useEffect(() => {
    // Update the jobs state whenever data.jobs changes
    setJobs(data?.jobs || []);
  }, [data.jobs]);

  useEffect(() => {
    // Update the contextData state whenever data changes
    setContextData(data);
  }, [data]);

  const refreshJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(response.data.jobs); // Update the jobs state with new data
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    }
  };

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>There is no job to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && "s"} Found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} refreshJobs={refreshJobs} />
        ))}
      </div>
      {numOfPages > 1 && <PageButtonContainer contextData={contextData} />}
    </Wrapper>
  );
};

export default JobContainer;
