/* eslint-disable react/prop-types */
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { GiConversation } from "react-icons/gi";
import { GrPersonalComputer } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { MdPending } from "react-icons/md";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Pending Applications",
      count: defaultStats?.pending || 0,
      icon: <MdPending />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "Interview Stage",
      count: defaultStats?.interview || 0,
      icon: <GiConversation />,
      color: "#ff00f7",
      bcg: "#f2ff00",
    },
    {
      title: "Technical Test",
      count: defaultStats?.technical || 0,
      icon: <GrPersonalComputer />,
      color: "#08b1ff",
      bcg: "#08b1ff",
    },
    {
      title: "Declined",
      count: defaultStats?.declined || 0,
      icon: <ImCross />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
    {
      title: "Accepted",
      count: defaultStats?.accepted || 0,
      icon: <BsFillFileEarmarkCheckFill />,
      color: "#57ff19",
      bcg: "#687878",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
