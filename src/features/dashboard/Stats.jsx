import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numOfBookings = bookings.length;
  const numOfConfirmedStays = confirmedStays.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={numOfConfirmedStays}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
};
