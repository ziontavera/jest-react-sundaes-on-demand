import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial state", () => {
  render(<SummaryForm />);
  const termsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitOrder = screen.getByRole("button", { name: /submit order/i });

  expect(termsAndConditions).not.toBeChecked();
  expect(submitOrder).toBeDisabled();
});

test("Clicking checkbox disables/enables the submit button", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  const termsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitOrder = screen.getByRole("button", { name: /submit order/i });

  await user.click(termsAndConditions);
  expect(submitOrder).toBeEnabled();

  await user.click(termsAndConditions);
  expect(submitOrder).toBeDisabled();
});

test("popover appears on hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(/the tnc/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/the tnc/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => screen.queryByText(/the tnc/i));
});
