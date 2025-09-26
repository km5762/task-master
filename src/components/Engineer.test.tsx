import { render } from "@testing-library/react";
import { test } from "vitest";
import Engineer from "./Engineer";

test("renders Engineer", () => {
  render(<Engineer name="test" tasks={[]} />);
});
