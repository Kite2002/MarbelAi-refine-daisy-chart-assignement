import React, { useEffect, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum } from "../../interfaces";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ChartDataCard from "../../components/dashboard/ChartDataCard";
import ChartCustomLegend from "../../components/dashboard/ChartCustomLegend";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { getDataBetweenDates } from "../../utils/helper";

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
  const [data, setData] = useState<IChartDatum[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    const res = await getDataBetweenDates(value?.startDate, value?.endDate);
    setData(res?.data);
  };

  useEffect(() => {
    fetchData();
  }, [value]);

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

        {showChart && (
          <>
            <div className="flex justify-end pb-4">
              <div className="w-[100%] md:w-[40%] self-end shadow-sm rounded-lg shadow-gray-400">
                <Datepicker
                  showShortcuts={true}
                  primaryColor="sky"
                  value={value}
                  onChange={handleValueChange}
                />
              </div>
            </div>
            <ResponsiveAreaChart data={data} />{" "}
            <div className="flex justify-end gap-[10px]">
              {legendData.map((pld, index) => {
                return <ChartCustomLegend key={index} pld={pld} />;
              })}
            </div>
          </>
        )}
      </div>

      <RecentSales />
    </>
  );
};
