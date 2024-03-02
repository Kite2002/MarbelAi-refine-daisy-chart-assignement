import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import {
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";

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

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveBarChart
          kpi="Daily orders"
          data={memoizedOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveAreaChart
          kpi="New customers"
          data={memoizedNewCustomersData}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
      {/* <TabView tabs={tabs} /> */}

      <div className="bg-white  shadow-[0px_1px_2px_0px_#00000040] py-7 space-y-9  rounded-[10px] px-4 pr-8 md:px-12 md:py-4">
        <div className="flex justify-between items-center">
          <div className="w-[95%]  grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-[25px] ">
            {[1, 2, 3, 4].map(() => {
              return (
                <div className="px-4 flex-1 group  transition-all duration-300 py-2 hover:bg-[#F1F1F1] bg-white rounded-[10px] gap-[25px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-medium text-[#303030]">
                      Online store sessions
                    </span>
                    <button
                      className="group-hover:opacity-100 opacity-0
transition-opacity duration-300 rounded-md p-[5px] hover:bg-[#CBC8C8]"
                    >
                      <PencilIcon
                        color="#00000080"
                        className="   w-[15px] h-[15px] "
                      />
                    </button>
                  </div>
                  <div className="flex gap-[5px] justify-start items-center">
                    <span className="text-[18px]  font-bold text-[#303030]">
                      255,581
                    </span>
                    <div className="flex text-[13px]   items-center ">
                      <ChevronUpIcon
                        color="#616161"
                        className=" w-[13px] h-[13px] "
                      />
                      9%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => setShowChart(!showChart)}>
            <ChevronDownIcon className="h-6 w-6" />
          </button>
        </div>
        {showChart && (
          <ResponsiveAreaChart
            kpi="Daily revenue"
            data={memoizedRevenueData}
            colors={{
              stroke: "rgb(54, 162, 235)",
              fill: "rgba(54, 162, 235, 0.2)",
            }}
          />
        )}
      </div>

      <RecentSales />
    </>
  );
};
