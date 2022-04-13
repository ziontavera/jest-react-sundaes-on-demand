import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  return (
    <>
      <h1>Design your Sundae!</h1>
      <br />
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <br />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("inReview")}>Checkout Sundae</Button>
    </>
  );
}

export default OrderEntry;
