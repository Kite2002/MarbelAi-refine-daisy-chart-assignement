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
      change : 21,
      info : "Your Store's traffic volume shown in sessions"
    },
    "Predicted Store sessions": {
      value: filteredData.reduce((total, entry) => total + entry.value_2, 0),
      type: "quantity",
      change : 22.2,
      info : "Your Store's predicted traffic volume shown in sessions"
    },
    "Conversion Rate": {
      value: 5,
      type: "rate",
      change : 1 ,
      info : "Your Store's conversion rate shown in sessions"
    },
    "Net Return value": {
      value: -15021,
      type: "amount",
      change : -6.32 ,
      info : "Your Store's net return value rate shown in sessions"
    },
    "Gross Sales": {
      value: 250211,
      type: "quantity",
      change : 24,
      info : "Your Store's gross sales shown in sessions"
    },
  };

  return {
    data: filteredData,
    dataCards: dataCards,
  };
}
