import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitButton } from "../components";
// import baseAPI from "../utils/baseAPI";
import axios from "axios";

const AddJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Pending",
    jobType: "Full-time",
    jobLocation: "",
  });

  const navigate = useNavigate();

  const validatePosition = (position) => {
    return position.length <= 100;
  };

  const validateLocation = (jobLocation) => {
    return jobLocation.length >= 3;
  };

  const addJob = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jobs`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Add Job Error:", error);
      toast.error(error.response.data.message);
      throw error;
    }
  };

  const mutation = useMutation(addJob);

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
        navigate("/dashboard/add-job");
      } else if (!response.success) {
        toast.error(response.message);
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    } catch (error) {
      console.error("Add Job Error:", error);
      toast.error(error.response.message);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h4 className="form-title">Add Job</h4>
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

export default AddJob;
