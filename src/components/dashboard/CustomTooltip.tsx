import React from 'react'
import { IChartDatum } from '../../interfaces';
import { formatDate } from '../../utils/helper';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid';

type CustomTooltipType = {
    payload : any,
    data : IChartDatum[],
    label : string,
}

export default function CustomTooltip({payload , data , label}:CustomTooltipType) {
  return (
    <div className=" bg-white shadow-[0px_1px_2px_0px_#00000040] rounded-[10px] p-[5px]">
    {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}

    {payload.map((pld: any) => {
      const key: any = pld?.dataKey;
      const firstData = data?.[0][key];
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
          <p>{formatDate(label, true)}</p>
          <p>{pld.value?.toLocaleString("en-IN")}</p>
          {key == "value" ? (
            firstData > pld?.value ? (
              <ArrowTrendingDownIcon className="h-4 w-4" />
            ) : (
              <ArrowTrendingUpIcon className="h-4 w-4" />
            )
          ) : (
            <></>
          )}
          <p>
            {key == "value" &&
              Math.abs(
                ((firstData - pld?.value) / firstData) * 100
              ).toFixed(2) + "%"}
          </p>
        </div>
      );
    })}
  </div>
  )
}
