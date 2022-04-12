import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update subtotal when scoop changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // initial state: subtotal = $0.00
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanila",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubTotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopSubTotal).toHaveTextContent("6.00");
});

test("update subtotal when toppings changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // initial state
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  // add 1 topping and check sub total
  const cherryTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherryTopping);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  // add another topping and check sub total
  const eminemTopping = await screen.findByRole("checkbox", {
    name: /m&ms/i,
  });
  await user.click(eminemTopping);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  // remove 1 topping and check sub total
  await user.click(cherryTopping);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

test("subtotal changes when updating either scoops or toppings", () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
});
