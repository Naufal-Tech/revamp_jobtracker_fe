/* eslint-disable react/prop-types */
import { Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

dayjs.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  created_at,
  refreshJobs,
}) => {
  const date = dayjs(created_at).format("DD MMMM YYYY");

  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mutation = useMutation(async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/jobs/${_id}`
      );
      toast.success(response.data.message);
      refreshJobs();
      queryClient.invalidateQueries("jobs", { exact: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    await mutation.mutateAsync(); // Trigger the delete
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <form>
            <button
              type="button"
              className="btn delete-btn"
              onClick={showModal}
            >
              Delete
            </button>
            <Modal
              title="Confirm Delete"
              visible={isModalVisible}
              onOk={handleDelete}
              onCancel={handleCancel}
              okText="Delete"
              cancelText="Cancel"
              confirmLoading={mutation.isLoading}
            >
              <p>Are you sure you want to delete this job?</p>
            </Modal>
          </form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
