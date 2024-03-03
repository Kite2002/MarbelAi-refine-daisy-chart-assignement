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
import {
  InformationCircleIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

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
            {[1, 2, 3, 4].map(() => {
              return (
                <div className="px-4 first-of-type:bg-[#f1f1f1] flex-1 group  transition-all duration-300 py-2 focus-within:bg-[#F1F1F1] hover:bg-[#F1F1F1] bg-white rounded-[10px] flex-col space-y-[5px] ">
                  <div className="flex justify-between items-center">
                    <span className=" border-b-[1px] border-[#CCCCCC] border-dashed text-[14px] font-medium text-[#303030]">
                      Online store sessions
                    </span>

                    <div
                      className="dropdown group-even:dropdown-end
                    "
                    >
                      <button className="group-hover:opacity-100 group-first:opacity-100 opacity-0  focus-within:opacity-100 focus-within:bg-[#CBC8C8] transition-opacity duration-300 rounded-md p-[5px] hover:bg-[#CBC8C8]">
                        <PencilIcon
                          color="#00000080"
                          className="   w-[15px] h-[15px] "
                        />
                      </button>
                      <ul className="shadow menu dropdown-content top-8 gap-[5px] z-[1] bg-base-100 rounded-[10px] ">
                        {[1, 2, 3, 4].map((item, index) => {
                          return (
                            <li className="flex justify-between">
                              <button
                                onClick={() =>
                                  (
                                    document?.activeElement as HTMLElement
                                  )?.blur()
                                }
                                className="flex text-xs text-[#303030] justify-between"
                              >
                                <div className="flex items-center gap-x-[10px]">
                                  <PresentationChartLineIcon className="h-4 w-4" />
                                  <p className=" text-nowrap">
                                    Online store sessions
                                  </p>
                                </div>

                                <InformationCircleIcon className="ml-5 h-3 w-3" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
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
        <div className="flex justify-end gap-[10px]">
          {[
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
          ].map((pld, index) => {
            return (
              <div className="flex items-center gap-3 bg-[#F6F6F7] rounded-md px-3 py-1 ">
                <div
                  style={{
                    borderColor: pld?.stroke,
                    borderStyle: pld?.dashed ? "dashed" : "solid",
                  }}
                  className={`border-2 h-[1px] w-4`}
                />
                <p className="text-[12px] text-[#70707A]">{pld?.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <RecentSales />
    </>
  );
};
