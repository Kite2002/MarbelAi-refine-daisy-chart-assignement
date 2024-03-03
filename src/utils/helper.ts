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