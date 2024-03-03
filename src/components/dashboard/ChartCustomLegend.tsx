import React from "react";

type LegendPayload = {
  stroke: string;
  value: string;
  dashed: boolean;
};

type Props = {
  pld: LegendPayload;
};

export default function ChartCustomLegend({ pld }: Props) {
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
}
