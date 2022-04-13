import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderEntry() {
  const [OrderDetails] = useOrderDetails();
  return (
    <>
      <h1>Design your Sundae!</h1>
      <br />
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <br />
      <h2>Grand total: {OrderDetails.totals.grandTotal}</h2>
    </>
  );
}

export default OrderEntry;
