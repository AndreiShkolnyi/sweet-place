import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./model/hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const CabinTable = () => {
  const { isLoading, error, data: cabins } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <p>error</p>;
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' role='table'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {cabins.length ? (
          <Table.Body
            data={cabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          />
        ) : (
          <Table.Empty>
            <p>We don&apos;t have cabins yet</p>
          </Table.Empty>
        )}
      </Table>
    </Menus>
  );
};

export default CabinTable;
