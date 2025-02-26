import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { fetchCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    fetchCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type='horizontal'>
      <Heading as='h1'>All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
