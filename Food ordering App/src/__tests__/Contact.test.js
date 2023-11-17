import Contact from "../components/Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Should load Contact component", () => {
  render(<Contact />);

  const heading = screen.getAllByRole("heading");
  expect(heading[0]).toBeInTheDocument();
});
