import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaCharts from "./AreaCharts";
import BarCharts from "./BarCharts";

// eslint-disable-next-line react/prop-types
const ChartContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}{" "}
      </button>{" "}
      {barChart ? <BarCharts data={data} /> : <AreaCharts data={data} />}
    </Wrapper>
  );
};

export default ChartContainer;
