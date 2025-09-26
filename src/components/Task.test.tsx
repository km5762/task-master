import { render } from "@testing-library/react";
import { test } from "vitest";
import Task from "./Task";

test("renders Task", () => {
  render(<Task name="test" estimatedMinutesToComplete={15} />);
});
