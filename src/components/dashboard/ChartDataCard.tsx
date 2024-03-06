import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  InformationCircleIcon,
  PencilIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

type Props = {
  item: string;
  dataCards: any;
};

const DropDownItem = ({ item }: any) => {
  return (
    <li className="relative group/inner flex justify-between">
      <button
        onClick={() => (document?.activeElement as HTMLElement)?.blur()}
        className="flex text-xs text-[#303030] justify-between"
      >
        <div className=" flex items-center gap-x-[10px]">
          <PresentationChartLineIcon className="h-4 w-4" />
          <p className=" text-nowrap">{item}</p>
        </div>

        <InformationCircleIcon className="ml-5 group-hover/inner:opacity-100 opacity-0 par h-4 w-4" />
      </button>
    </li>
  );
};

const DropDown = ({ dataCards }: any) => {
  const datList = Object.keys(dataCards);
  return (
    <ul className="shadow menu dropdown-content top-8 gap-[5px] z-[1] bg-base-100 rounded-[10px] ">
      {datList.map((item, index) => {
        return <DropDownItem item={item} />;
      })}
    </ul>
  );
};

export default function ChartDataCard({ item, dataCards }: Props) {
  const thisData = dataCards?.[item];
  return (
    <div className="px-4 first-of-type:bg-[#f1f1f1] flex-1 group  transition-all duration-300 py-2 focus-within:bg-[#F1F1F1] hover:bg-[#F1F1F1] bg-white rounded-[10px] flex-col space-y-[5px] ">
      <div className="flex justify-between items-center">
        <span className=" border-b-[1px] border-[#CCCCCC] border-dashed text-[14px] font-medium text-[#303030]">
          <div className="dropdown  dropdown-hover">
            <div tabIndex={0}>{item}</div>
            <div className="dropdown-content w-[300px] max-w-[90%] gap-3 shadow flex-col px-4 py-3 z-[1] bg-base-100 rounded-box ">
              <p className=" text-base font-semibold">{item}</p>
              <p className="text-sm text-[#00000089]">{thisData?.info}</p>
            </div>
            {/* <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul> */}
          </div>
        </span>

        <div
          className="dropdown dropdown-bottom dropdown-end
      "
        >
          <button className="group-hover:opacity-100 group-first:opacity-100 opacity-0  focus-within:opacity-100 focus-within:bg-[#CBC8C8] transition-opacity duration-300 rounded-md p-[5px] hover:bg-[#CBC8C8]">
            <PencilIcon color="#00000080" className="   w-[18px] h-[18px] " />
          </button>
          <DropDown dataCards={dataCards} />
        </div>
      </div>
      <div className="flex gap-[5px] justify-start items-center">
        <span className="text-[18px]  font-bold text-[#303030]">
          {thisData?.value < 0 && "-"}
          {thisData?.type == "amount" && "$"}
          {Math.abs(thisData?.value)?.toLocaleString("en-IN", {})}
          {thisData?.type == "rate" && "%"}
        </span>
        <div className="flex text-[13px]   items-center ">
          {thisData?.change < 0 ?  <ChevronDownIcon color="#616161" className=" w-[13px] h-[13px] " /> :  <ChevronUpIcon color="#616161" className=" w-[13px] h-[13px] " /> }
         
          {thisData?.change}%
        </div>
      </div>
    </div>
  );
}
