import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  function handleClick() {
    // reset order details
    resetOrder();

    // re-route back to order page
    setOrderPhase("inProgress");
  }

  const renderOrderConfirmation = (
    <div style={{ textAlign: "center" }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>enjoy your sundae!</p>
      <Button onClick={handleClick}>Order Again</Button>
    </div>
  );

  if (orderNumber) {
    return renderOrderConfirmation;
  } else if (error) {
    return <AlertBanner />;
  }
  return <div>Loading</div>;
}

export default OrderConfirmation;
