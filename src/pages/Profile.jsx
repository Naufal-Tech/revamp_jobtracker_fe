import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  // eslint-disable-next-line no-unused-vars
  const { username, firstName, lastName, email, location } = user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username,
    firstName,
    lastName,
    email,
    currentPassword: "",
    newPassword: "",
    location,
  });

  // Validation
  const validateFileSize = (file) => {
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    return file.size <= maxFileSize;
  };

  const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 20;
  };

  const validatefirstName = (firstName) => {
    return firstName.length >= 3 && firstName.length <= 20;
  };

  const validatelastName = (lastName) => {
    return lastName.length >= 3 && lastName.length <= 20;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatenewPassword = (newPassword) => {
    return newPassword.length >= 6;
  };

  const validatecurrentPassword = (currentPassword) => {
    return currentPassword.length >= 6;
  };

  const validateLocation = (location) => {
    return location.length >= 3 && location.length <= 20;
  };

  const editProfile = async (formData) => {
    const formDataToSend = new FormData();

    formDataToSend.append("username", formData.username);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("location", formData.location);

    // Append/Update img_profile file to FormData object if selected
    if (formData.img_profile) {
      formDataToSend.append("img_profile", formData.img_profile);
    }

    // Append/Update currentPassword if provided and not empty
    if (
      formData.currentPassword &&
      validatecurrentPassword(formData.currentPassword)
    ) {
      formDataToSend.append("currentPassword", formData.currentPassword);
    }

    // Append/Update newPassword if provided and not empty
    if (formData.newPassword && validatenewPassword(formData.newPassword)) {
      formDataToSend.append("newPassword", formData.newPassword);
    }

    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/update`,
      formDataToSend
    );

    return response.data;
  };

  const mutation = useMutation(editProfile);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedFile = event.target.img_profile.files[0];

    // If no values are provided in the form, replace with the existing user values
    const updatedFormData = {
      username: formData.username || username,
      firstName: formData.firstName || firstName,
      lastName: formData.lastName || lastName,
      email: formData.email || email,
      location: formData.location || location,
      img_profile: selectedFile || null,
    };

    if (updatedFormData.img_profile) {
      if (!validateFileSize(updatedFormData.img_profile)) {
        toast.error("File size must be less than 5 MB");
        return;
      }
    }

    if (!validateUsername(updatedFormData.username)) {
      toast.error("Username must be at least 3-20 characters long");
      return;
    }

    if (!validatefirstName(updatedFormData.firstName)) {
      toast.error("First name must be at least 3-20 characters long");
      return;
    }

    if (!validatelastName(updatedFormData.lastName)) {
      toast.error("Last name must be at least 3-20 characters long");
      return;
    }

    if (!validateEmail(updatedFormData.email)) {
      toast.error("Please input a valid email address");
      return;
    }

    // Validate and include currentPassword if provided
    if (
      formData.currentPassword &&
      validatecurrentPassword(formData.currentPassword)
    ) {
      updatedFormData.currentPassword = formData.currentPassword;
    } else {
      delete updatedFormData.currentPassword; // Exclude if empty or less than 6 characters
    }

    // Validate and include newPassword if provided
    if (formData.newPassword && validatenewPassword(formData.newPassword)) {
      updatedFormData.newPassword = formData.newPassword;
    } else {
      delete updatedFormData.newPassword; // Exclude if empty or less than 6 characters
    }

    if (!validateLocation(updatedFormData.location)) {
      toast.error("Location must be at least 3-20 characters");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await mutation.mutateAsync(updatedFormData);
      if (response.success) {
        toast.success(response.message);
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/dashboard/profile");
      } else {
        toast.error(response.message);
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    } catch (error) {
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
      <form
        className="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h4 className="form-title">Profile User</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="img_profile" className="form-label">
              Select an Image File
            </label>
            <input
              type="file"
              id="img_profile"
              name="img_profile"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="username"
            value={formData.username}
            labelText="Username"
            onChange={handleInputChange}
            placeholder="Enter Username"
            required
          />
          <FormRow
            type="text"
            name="firstName"
            value={formData.firstName}
            labelText="First Name"
            onChange={handleInputChange}
            placeholder="Enter First Name"
            required
          />
          <FormRow
            type="text"
            name="lastName"
            value={formData.lastName}
            labelText="Last Name"
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            required
          />
          <FormRow
            type="text"
            name="email"
            value={formData.email}
            labelText="Email Address"
            onChange={handleInputChange}
            placeholder="Enter Email Address"
            required
          />
          <FormRow
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            labelText="Current Password"
            onChange={handleInputChange}
            placeholder="Enter Current Password to Change Your Password"
          />
          <FormRow
            type="password"
            name="newPassword"
            value={formData.newPassword}
            labelText="New Password"
            onChange={handleInputChange}
            placeholder="Enter New Password to Change Your Password"
          />
          <FormRow
            type="text"
            name="location"
            value={formData.location}
            labelText="Location"
            onChange={handleInputChange}
            placeholder="Enter Location"
            required
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
