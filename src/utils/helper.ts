import { data } from "../Data/data";

export const formatDate = (date: string, day?: boolean) => {
  let dateConfig: any = {
    month: "short",
    year: "numeric",
  };
  if (day) {
    dateConfig = { ...dateConfig, day: "2-digit" };
  }
  return new Intl.DateTimeFormat("en-US", dateConfig).format(new Date(date));
};

export function getDataBetweenDates(startDate?: Date, endDate?: Date) {
  let filteredData = data;
  if (startDate && endDate) {
    filteredData = filteredData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    });
  }

  const dataCards = {
    "Online Store sessions": {
      value: filteredData.reduce((total, entry) => total + entry.value, 0),
      type: "quantity",
    },
    "Predicted Store sessions": {
      value: filteredData.reduce((total, entry) => total + entry.value_2, 0),
      type: "quantity",
    },
  };

  return {
    data: filteredData,
    dataCards: dataCards,
  };
}
