import {
  ChevronUpIcon,
  InformationCircleIcon,
  PencilIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/20/solid";

type Props = {};

const DropDownItem = () => {
  return (
    <li className="flex justify-between">
      <button
        onClick={() => (document?.activeElement as HTMLElement)?.blur()}
        className="flex text-xs text-[#303030] justify-between"
      >
        <div className="flex items-center gap-x-[10px]">
          <PresentationChartLineIcon className="h-4 w-4" />
          <p className=" text-nowrap">Online store sessions</p>
        </div>

        <InformationCircleIcon className="ml-5 h-3 w-3" />
      </button>
    </li>
  );
};

const DropDown = () => {
  return (
    <ul className="shadow menu dropdown-content top-8 gap-[5px] z-[1] bg-base-100 rounded-[10px] ">
      {[1, 2, 3, 4].map((item, index) => {
        return <DropDownItem />;
      })}
    </ul>
  );
};

export default function ChartDataCard({}: Props) {
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
            <PencilIcon color="#00000080" className="   w-[15px] h-[15px] " />
          </button>
          <DropDown />
        </div>
      </div>
      <div className="flex gap-[5px] justify-start items-center">
        <span className="text-[18px]  font-bold text-[#303030]">255,581</span>
        <div className="flex text-[13px]   items-center ">
          <ChevronUpIcon color="#616161" className=" w-[13px] h-[13px] " />
          9%
        </div>
      </div>
    </div>
  );
}
