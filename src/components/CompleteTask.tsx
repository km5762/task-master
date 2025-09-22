import { useState } from "react";
import { completeTask } from "../models/Model";

export default function CompleteTask({
  onComplete,
}: {
  onComplete: (minutesToComplete: number) => void;
}) {
  const [minutesToComplete, setMinutesToComplete] = useState(0);
  return (
    <div>
      <input
        type="number"
        value={minutesToComplete}
        onChange={(e) => setMinutesToComplete(parseInt(e.target.value))}
      />
      <button onClick={() => onComplete(minutesToComplete)}>Complete</button>
    </div>
  );
}
