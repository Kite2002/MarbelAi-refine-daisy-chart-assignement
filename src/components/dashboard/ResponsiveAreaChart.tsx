import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";
import { IChartDatum } from "../../interfaces";
import { formatDate } from "../../utils/helper";
import CustomTooltip from "./CustomTooltip";

type TResponsiveAreaChartProps = {
  data: IChartDatum[];
};

export const ResponsiveAreaChart = ({ data }: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer
      height={282}
      className={"flex m-auto justify-center items-center  "}
    >
      <LineChart
        {...{
          overflow: "visible",
        }}
        width={800}
        data={data}
      >
        <CartesianGrid strokeWidth={1} stroke="#E6E6E6" vertical={false} />
        <XAxis
          stroke="#676767"
          dy={10}
          dx={20}
          tick={{ fontSize: 18 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => formatDate(tick)}
          dataKey="date"
          minTickGap={90}
        />
        <YAxis
          tick={{ fontSize: 18 }}
          className="text-sm"
          stroke="#676767"
          axisLine={false}
          tickLine={false}
          tickCount={3}
          tickFormatter={(tick) => (tick == 0 ? "0" : tick / 1000 + "k")}
          dataKey={"value"}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <CustomTooltip payload={payload} data={data} label={label} />
              );
            }

            return null;
          }}
          contentStyle={{
            borderRadius: 12,
            borderWidth: 0,
            boxShadow: "0px 1px 2px 0px #00000040",
          }}
        />
        <Line
          strokeWidth={3}
          dot={false}
          type="monotone"
          dataKey="value"
          stroke="#489AD2"
        />
        <Line
          strokeWidth={3}
          dot={false}
          strokeDasharray={"4 4"}
          type="monotone"
          dataKey="value_2"
          stroke="#489AD233"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
