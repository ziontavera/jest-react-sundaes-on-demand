import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: handle error response
        // console.log(error);
        setErrors(!errors);
      });
  }, [optionType]);

  if (errors) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newCount) =>
        updateItemCount(itemName, newCount, optionType)
      }
    />
  ));
  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
