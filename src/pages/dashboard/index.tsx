import React, { useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum } from "../../interfaces";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { data } from "../../Data/data";
import ChartDataCard from "../../components/dashboard/ChartDataCard";
import ChartCustomLegend from "../../components/dashboard/ChartCustomLegend";

const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(7, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

export const Dashboard: React.FC = () => {
  const newData: IChartDatum[] = data;
  const [showChart, setShowChart] = useState(true);
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const legendData = [
    {
      stroke: "#489AD2",
      dashed: false,
      value: "Actual Sessions",
    },
    {
      stroke: "#489AD233",
      dashed: true,
      value: "Predicted Sessions",
    },
  ];
  const dataCardInfo = [1, 2, 3, 4];
  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />

      <div className="bg-white  shadow-[0px_1px_2px_0px_#00000040] py-7 space-y-9  rounded-[10px] px-4 pr-8 md:px-12 md:py-4">
        <div className="flex justify-between items-center">
          <div className="w-[95%] grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-[25px] ">
            {dataCardInfo.map((item, index) => {
              return <ChartDataCard key={index} />;
            })}
          </div>
          <button onClick={() => setShowChart(!showChart)}>
            <ChevronDownIcon className="h-6 w-6" />
          </button>
        </div>
        {showChart && <ResponsiveAreaChart data={newData} />}
        <div className="flex justify-end gap-[10px]">
          {legendData.map((pld, index) => {
            return <ChartCustomLegend key={index} pld={pld} />;
          })}
        </div>
      </div>

      <RecentSales />
    </>
  );
};
