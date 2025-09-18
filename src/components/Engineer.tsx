import type { TaskProps } from "./Task";
import Task from "./Task";

export type EngineerProps = {
  name: string;
  tasks: TaskProps[];
};

export default function Engineer({ name, tasks }: EngineerProps) {
  return (
    <div>
      <b>
        {name} (
        {tasks.reduce((sum, task) => sum + task.estimatedMinutesToComplete, 0)}{" "}
        minutes)
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
