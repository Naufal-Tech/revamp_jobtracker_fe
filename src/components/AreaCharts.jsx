/* eslint-disable react/prop-types */
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomizedLabel = ({ x, y, value }) => (
  <text x={x} y={y} dy={-10} textAnchor="middle" fill="#666">
    {value}
  </text>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AreaCharts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#999" }}
          tickLine={{ stroke: "#999" }}
        >
          <Label
            content={<CustomizedLabel />}
            position="insideBottom"
            offset={-10}
          />
        </XAxis>
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "#999" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
          content={<CustomTooltip />}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2cb1bc" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2cb1bc" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="count"
          stroke="#2cb1bc"
          fill="url(#colorGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaCharts;
