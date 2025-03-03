import styled from "styled-components";
import { useRecentBookings } from "./model/hooks/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./model/hooks/useRecentStays";
import { Stats } from "./Stats";
import { useCabins } from "../cabins/model/hooks/useCabins";
import { SalesChart } from "./SalesChart";
import { DurationChart } from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const { isLoading, data: bookings } = useRecentBookings();
  const {
    isLoading: isStaysLoading,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { data: cabins, isLoading: isCabinsLoading } = useCabins();

  if (isLoading || isStaysLoading || isCabinsLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};
