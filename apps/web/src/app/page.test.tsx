import { render, screen } from "@testing-library/react";
import Home from "./page";

it("renders the application name", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: "Tasks Management" }),
  ).toBeInTheDocument();
});
