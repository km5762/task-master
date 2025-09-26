import { fireEvent, screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import App from "./App";

test("renders App", () => {
  render(<App />);
});

test("adds a new engineer", () => {
  render(<App />);
  const engineerFieldset = screen.getByRole("group", { name: /add engineer/i });

  const engineerInput = within(engineerFieldset).getByLabelText(/name/i);
  const addButton = within(engineerFieldset).getByRole("button", {
    name: /add/i,
  });

  fireEvent.change(engineerInput, { target: { value: "Alice" } });
  fireEvent.click(addButton);

  const engineer = screen.getByText(/Alice/i);
  expect(engineer).to.exist;
});

test("adds a new task", () => {
  render(<App />);

  const taskFieldset = screen.getByRole("group", { name: /add task/i });

  const taskNameInput = within(taskFieldset).getByLabelText(/name/i);
  const taskMinutesInput = within(taskFieldset).getByLabelText(
    /estimated minutes to complete/i,
  );

  const addButton = within(taskFieldset).getByRole("button", { name: /add/i });

  fireEvent.change(taskNameInput, { target: { value: "Build API" } });
  fireEvent.change(taskMinutesInput, { target: { value: 120 } });

  fireEvent.click(addButton);

  const task = screen.getByText(/Build API/i);
  expect(task).toBeInTheDocument();
});
