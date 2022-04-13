import { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "inReview":
      Component = OrderSummary;
      break;
    case "finished":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
