import { render } from "@testing-library/react";
import { test } from "vitest";
import CompleteTask from "./CompleteTask";

test("renders CompleteTask", () => {
  render(<CompleteTask onComplete={() => {}} />);
});
