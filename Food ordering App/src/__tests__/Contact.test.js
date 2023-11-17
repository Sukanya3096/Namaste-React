import Contact from "../components/Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Should load Contact component", () => {
  render(<Contact />);

  const heading = screen.getAllByRole("heading");
  expect(heading[0]).toBeInTheDocument();
});

test("Should load button inside Contact component", () => {
  render(<Contact />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Should load textbox inside Contact component", () => {
  render(<Contact />);

  const textBox = screen.getAllByRole("textbox");
  expect(textBox.length).toBe(3);
});
