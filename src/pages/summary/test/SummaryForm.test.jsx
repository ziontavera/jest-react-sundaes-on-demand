import { render, screen } from "@testing-library/react";
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
  render(<SummaryForm />);
  const user = userEvent.setup();

  const nullPopover = screen.queryByText(/the tnc/i);

  // initial state
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.queryByText(/the tnc/i);

  expect(popover).toBeInTheDocument();
  await user.unhover(termsAndConditions);

  const nullPopoverAgain = screen.queryByText(/the tnc/i);
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
