import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  LineChart,
  Legend,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  colors,
}: TResponsiveAreaChartProps) => {
  const newData: IChartDatum[] = [
    { date: "Oct 01, 2022", value: 13560, value_2: 12580 },
    { date: "Oct 10, 2022", value: 13900, value_2: 15100 },
    { date: "Oct 20, 2022", value: 13100, value_2: 12050 },

    { date: "Nov 01, 2022", value: 13800, value_2: 14200 },
    { date: "Nov 10, 2022", value: 13500, value_2: 11300 },
    { date: "Nov 20, 2022", value: 14000, value_2: 16100 },

    { date: "Dec 01, 2022", value: 14200, value_2: 12120 },
    { date: "Dec 10, 2022", value: 14500, value_2: 14350 },
    { date: "Dec 20, 2022", value: 15400, value_2: 13350 },

    { date: "Jan 01, 2023", value: 15200, value_2: 14100 },
    { date: "Jan 10, 2023", value: 14100, value_2: 11900 },
    { date: "Jan 20, 2023", value: 11800, value_2: 13850 },

    { date: "Feb 01, 2023", value: 12900, value_2: 14500 },
    { date: "Feb 10, 2023", value: 13000, value_2: 11200 },
    { date: "Feb 20, 2023", value: 15100, value_2: 13750 },

    { date: "Mar 01, 2023", value: 16200, value_2: 14100 },
    { date: "Mar 10, 2023", value: 16800, value_2: 18200 },
    { date: "Mar 20, 2023", value: 17100, value_2: 15100 },

    { date: "Apr 01, 2023", value: 15500, value_2: 17500 },
    { date: "Apr 10, 2023", value: 17000, value_2: 15200 },
    { date: "Apr 20, 2023", value: 17700, value_2: 19650 },

    { date: "May 01, 2023", value: 17900, value_2: 20400 },
    { date: "May 10, 2023", value: 19900, value_2: 21300 },
    { date: "May 20, 2023", value: 22000, value_2: 19600 },

    { date: "Jun 01, 2023", value: 24100, value_2: 23100 },
    { date: "Jun 10, 2023", value: 25500, value_2: 24200 },
    { date: "Jun 20, 2023", value: 23300, value_2: 21000 },

    { date: "Jul 01, 2023", value: 26400, value_2: 28200 },
    { date: "Jul 10, 2023", value: 26500, value_2: 24800 },
    { date: "Jul 20, 2023", value: 26600, value_2: 28300 },

    { date: "Aug 01, 2023", value: 26200, value_2: 24600 },
    { date: "Aug 10, 2023", value: 26800, value_2: 28500 },
    { date: "Aug 20, 2023", value: 26900, value_2: 28300 },

    { date: "Sep 01, 2023", value: 34000, value_2: 32000 },
    { date: "Sep 10, 2023", value: 27100, value_2: 29500 },
    { date: "Sep 20, 2023", value: 29200, value_2: 31200 },

    { date: "Oct 01, 2023", value: 27300, value_2: 28200 }, // Peak in October
    { date: "Oct 10, 2023", value: 26000, value_2: 27200 },
    { date: "Oct 20, 2023", value: 26400, value_2: 24200 },

    { date: "Nov 01, 2023", value: 25500, value_2: 23800 },
    { date: "Nov 10, 2023", value: 25000, value_2: 27200 },
    { date: "Nov 20, 2023", value: 25500, value_2: 22300 },

    { date: "Nov 30, 2023", value: 24500, value_2: 26200 },
    { date: "Dec 05, 2023", value: 23500, value_2: 21800 },
    { date: "Dec 10, 2023", value: 23000, value_2: 20800 },

    { date: "Dec 15, 2023", value: 22500, value_2: 21800 },
    { date: "Dec 20, 2023", value: 22000, value_2: 23800 },
    { date: "Dec 25, 2023", value: 21500, value_2: 19800 },

    { date: "Dec 30, 2023", value: 21000, value_2: 23800 },
    { date: "Dec 31, 2023", value: 20500, value_2: 21800 },
  ];
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };
  const tickCount = data?.length > 8 ? 8 : data?.length;
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
        data={newData}
      >
        <CartesianGrid strokeWidth={2} stroke="#E6E6E6" vertical={false} />
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
          content={({ active, payload, label, ...props }) => {
            if (active && payload && payload.length) {
              return (
                <div className=" bg-white shadow-[0px_1px_2px_0px_#00000040] rounded-[10px] p-[5px]">
                  {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}

                  {payload.map((pld: any) => {
                    const key: any = pld?.dataKey;
                    const firstData = newData?.[0][key];
                    return (
                      <div className=" font-medium flex text-[#303030] text-[12px] py-[5px] px-[10px] gap-[10px] items-center">
                        <div
                          style={{
                            borderColor: pld?.stroke,
                            borderStyle: pld?.strokeDasharray
                              ? "dashed"
                              : "solid",
                          }}
                          className={`border-2 h-[1px] w-4`}
                        ></div>
                        <p>{formatDate(label)}</p>
                        <p>{pld.value?.toLocaleString("en-IN")}</p>
                        {firstData > pld?.value ? (
                          <ArrowTrendingDownIcon
                            color="red"
                            className="h-4 w-4"
                          />
                        ) : (
                          <ArrowTrendingUpIcon
                            color="green"
                            className="h-4 w-4"
                          />
                        )}
                        <p
                          style={{
                            color: firstData > pld?.value ? "red" : "green",
                          }}
                        >
                          {Math.abs(
                            ((firstData - pld?.value) / firstData) * 100
                          ).toFixed(2)}
                          %
                        </p>
                      </div>
                    );
                  })}
                </div>
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
        {/* <Legend align="left" iconType="plainline" color="#70707A" /> */}
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
