import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
import convertValToCurrency from "../utils/CurrencyConvert";

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const ctx = useContext(OrderDetails);
  if (!ctx) {
    throw new Error("useOrderDetails must be used within OrderDetailsProvider");
  }
  return ctx;
};

const calculateSubtotal = (optionType, optionCount) => {
  let countOption = 0;

  for (const count of optionCount[optionType].values()) {
    countOption += count;
  }

  return countOption * pricePerItem[optionType];
};

export function OrderDetailsProvider(props) {
  const [optionCount, setOptionCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = convertValToCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopSubtotal = calculateSubtotal("scoops", optionCount);
    const toppingSubtotal = calculateSubtotal("toppings", optionCount);
    const grandTotal = scoopSubtotal + toppingSubtotal;

    setTotals({
      scoops: convertValToCurrency(scoopSubtotal),
      toppings: convertValToCurrency(toppingSubtotal),
      grandTotal: convertValToCurrency(grandTotal),
    });
  }, [optionCount]);
  const value = useMemo(() => {
    function updateItemCount(itemName, newCount, optionType) {
      const newOptionCount = { ...optionCount };
      const optionCountMap = newOptionCount[optionType];
      optionCountMap.set(itemName, parseInt(newCount));
      setOptionCount(newOptionCount);
    }

    return [{ ...optionCount, totals }, updateItemCount];
  }, [optionCount, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
