import { useState } from "react";

import axios from "axios";
import { useMutation } from "react-query";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitButton } from "../components";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  console.log("🚀 ~ file: EditJob.jsx:10 ~ loader ~ params:", params);
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/jobs/detail/${params.id}`
    );
    console.log("🚀 ~ file: AllJob.jsx:11 ~ loader ~ data:", data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  console.log("🚀 ~ file: EditJob.jsx:54 ~ EditJob ~  job :", job);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    status: job.status,
    jobType: job.jobType,
    jobLocation: job.jobLocation,
  });

  const params = useParams();

  // Example backend data for select options
  const jobStatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Interview", label: "Interview" },
    { value: "Declined", label: "Declined" },
    { value: "Technical-Test", label: "Technical-Test" },
    { value: "Accepted", label: "Accepted" },
  ];

  const jobTypeOptions = [
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

  const validatePosition = (position) => {
    return position.length <= 100;
  };

  const validateLocation = (jobLocation) => {
    return jobLocation.length >= 3;
  };

  const editJob = async (formData) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/jobs/${params.id}`,
      formData
    );
    console.log("🚀 ~ file: AddJob.jsx:31 ~ addJob ~ response:", response);
    return response.data;
  };

  const mutation = useMutation(editJob);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePosition(formData.position)) {
      toast.error("Position must be at least 100 characters long");
      return;
    }

    if (!validateLocation(formData.jobLocation)) {
      toast.error("Position must be at least 3 characters long");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await mutation.mutateAsync(formData);
      if (response.success) {
        toast.success(response.message);
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/dashboard/all-jobs");
      } else {
        toast.error(response.message);
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response.message);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={formData.position}
            labelText="Position"
            onChange={handleInputChange}
            placeholder="Enter position"
            required
          />
          <FormRow
            type="text"
            name="company"
            value={formData.company}
            labelText="Company"
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            labelText="Job Location"
            onChange={handleInputChange}
            placeholder="Enter the location of company"
            required
          />
          <FormRow
            type="select"
            name="jobType"
            labelText="Job Type"
            options={jobTypeOptions}
            value={formData.jobType}
            onChange={handleInputChange}
            required
          />
          <FormRow
            type="select"
            name="status"
            labelText="Job Status"
            options={jobStatusOptions}
            value={formData.status}
            onChange={handleInputChange}
            required
          />
          <SubmitButton isSubmitting={isSubmitting} formBtn={true} />
        </div>
      </form>
    </Wrapper>
  );
};

export default EditJob;
