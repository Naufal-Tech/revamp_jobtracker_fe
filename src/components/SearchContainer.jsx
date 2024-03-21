import { useState } from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useAllJobContext } from "../pages/AllJob";

const SearchContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobContext(); // Use the refetch function from react-query
  const { status, jobType, sort } = searchValues;

  // Example backend data for select options
  const jobStatusOptions = [
    { value: "Select", label: "Select" },
    { value: "Pending", label: "Pending" },
    { value: "Interview", label: "Interview" },
    { value: "Declined", label: "Declined" },
    { value: "Technical-Test", label: "Technical-Test" },
    { value: "Accepted", label: "Accepted" },
  ];

  const jobTypeOptions = [
    { value: "Select", label: "Select" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Internship/Magang", label: "Internship/Magang" },
    { value: "Freelance", label: "Freelance" },
    { value: "Full-time (WFO)", label: "Full-time (WFO)" },
    { value: "Full-time (Hybird)", label: "Full-time (Hybird)" },
    { value: "Full-time (WFH)", label: "Full-time (WFH)" },
    { value: "Internship/Magang (WFO)", label: "Internship/Magang (WFO)" },
    { value: "Internship/Magang (WFH)", label: "Internship/Magang (WFH)" },
    {
      value: "Internship/Magang (Hybird)",
      label: "Internship/Magang (Hybird)",
    },
    { value: "Unpaid Job", label: "Unpaid Job" },
  ];

  const [search, setSearch] = useState("");

  // Debounce function
  const debounce = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const delayedSubmit = debounce(submit, 2000); // debounce delay timer

  const handleSearchChange = (event) => {
    const newSearchValue = event.target.value;
    setSearch(newSearchValue);
    delayedSubmit(event.currentTarget.form);
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            value={search}
            onChange={handleSearchChange}
          />
          <FormRow
            type="select"
            name="jobType"
            labelText="Job Type"
            options={jobTypeOptions}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            value={jobType}
          />
          <FormRow
            type="select"
            name="status"
            labelText="Job Status"
            options={jobStatusOptions}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            value={status}
          />
          <FormRow
            type="select"
            name="sort"
            labelText="Sort By"
            options={[
              { value: "Select", label: "Select" },
              { value: "Recently", label: "Recently" },
              { value: "Oldest", label: "Oldest" },
              { value: "Ascending", label: "Ascending" },
              { value: "Descending", label: "Descending" },
              { value: "A-Z", label: "A-Z" },
              { value: "Z-A", label: "Z-A" },
            ]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            value={sort}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
