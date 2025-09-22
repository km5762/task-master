import type { Task } from "../models/Task";

export default function Task({
  name,
  estimatedMinutesToComplete,
  actualMinutesToComplete,
}: Task) {
  return (
    <span>
      <b>{name}</b> — Estimate: {estimatedMinutesToComplete} min
      {actualMinutesToComplete !== undefined && (
        <> — Actual: {actualMinutesToComplete} min</>
      )}
    </span>
  );
}
