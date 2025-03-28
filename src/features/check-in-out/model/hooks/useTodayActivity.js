import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../../../services/apiBookings";

export const useTodayActivity = () => {
  return useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
};
