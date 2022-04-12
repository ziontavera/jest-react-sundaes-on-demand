import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import React from "react";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("handle error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
