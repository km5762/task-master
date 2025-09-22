import type { Engineer } from "../models/Engineer";
import Task from "./Task";

export default function Engineer({ name, tasks }: Engineer) {
  return (
    <div>
      <b>
        {name} (
        {tasks.reduce((sum, task) => sum + task.estimatedMinutesToComplete, 0)}{" "}
        min)
      </b>
      <button>X</button>
      <ul>
        {tasks.map((task, index) => (
          <li>
            <Task key={index} {...task}></Task>
            <div>
              <input type="number" />
              <button>Complete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
