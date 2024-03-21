import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

const Links = [
  { id: 1, text: "Stats", path: ".", icon: <IoBarChartSharp /> },
  { id: 2, text: "All Job", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 3, text: "Add Job", path: "add-job", icon: <FaWpforms /> },
  { id: 4, text: "Profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "Admin", path: "admin", icon: <RiAdminFill /> },
];

export default Links;
