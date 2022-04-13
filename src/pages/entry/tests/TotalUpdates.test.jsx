import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update subtotal when scoop changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // initial state: subtotal = $0.00
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
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

describe("grand total", () => {
  const user = userEvent.setup();

  test("grand total updates accordingly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    expect(grandTotal).toHaveTextContent("0.00");

    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    const cherryTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherryTopping);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates accordingly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const hotFudgeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeTopping);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaTopping = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(vanillaTopping);
    await user.type(vanillaTopping, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates accordingly if item is removed", async () => {
    render(<OrderEntry />);

    const cherryToppings = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherryToppings);

    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, "2");

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, "1");

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherryToppings);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
