import { useState } from "react";
import "./App.css";
import type { TaskProps } from "./components/Task";
import type { EngineerProps } from "./components/Engineer";
import Engineer from "./components/Engineer";
import Task from "./components/Task";

function App() {
  const [engineers, setEngineers] = useState<EngineerProps[]>([
    {
      name: "John Doe",
      tasks: [
        { name: "Write Tests", estimatedMinutesToComplete: 10 },
        { name: "Debug the Bug", estimatedMinutesToComplete: 20 },
      ],
    },
    {
      name: "Ann Onymous",
      tasks: [
        { name: "Write More Tests", estimatedMinutesToComplete: 10 },
        { name: "Debug More Bugs", estimatedMinutesToComplete: 20 },
      ],
    },
    {
      name: "Ada Lovelace",
      tasks: [{ name: "Deploy the Program", estimatedMinutesToComplete: 5 }],
    },
  ]);
  const [unassignedTasks, setUnassignedTasks] = useState<TaskProps[]>([
    { name: "Be AGILE", estimatedMinutesToComplete: 10 },
    { name: "Waterfall the KPIs", estimatedMinutesToComplete: 10e6 },
    { name: "Circle Back", estimatedMinutesToComplete: 5 },
  ]);
  const [completedTasks, setCompletedTasks] = useState<TaskProps[]>([
    {
      name: "Get Coffee",
      estimatedMinutesToComplete: 10,
      actualMinutesToComplete: 20,
    },
    {
      name: "Code",
      estimatedMinutesToComplete: 20,
      actualMinutesToComplete: 30,
    },
  ]);

  return (
    <>
      <section>
        <h1>Engineers</h1>
        <ul>
          {engineers.map((engineer, index) => (
            <li>
              <Engineer key={index} {...engineer}></Engineer>
            </li>
          ))}
        </ul>
        <form>
          <fieldset>
            <legend>Add Engineer</legend>
            <div>
              <label htmlFor="engineer-name">Name</label>
              <input id="engineer-name" type="text" />
            </div>
            <button type="submit">Add</button>
          </fieldset>
        </form>
      </section>
      <section>
        <h1>
          Unassigned Tasks (
          {unassignedTasks.reduce(
            (sum, task) => sum + task.estimatedMinutesToComplete,
            0,
          )}{" "}
          min)
        </h1>
        <ul>
          {unassignedTasks.map((task, index) => (
            <li>
              <Task key={index} {...task}></Task>
              <button>X</button>
              <div>
                <label htmlFor="assign-task">Assign to </label>
                <select name="assign-task" id="assign-task">
                  <option hidden disabled selected>
                    Select an Engineer
                  </option>
                  {engineers.map((engineer, index) => (
                    <option value={engineer.name}>{engineer.name}</option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
        <form>
          <fieldset>
            <legend>Add Task</legend>
            <div>
              <label htmlFor="task-name">Name</label>
              <input id="task-name" type="text" />
            </div>
            <div>
              <label htmlFor="task-estimated-minutes-to-complete">
                Estimated Minutes to Complete
              </label>
              <input id="task-estimated-minutes-to-complete" type="number" />
            </div>
            <button type="submit">Add</button>
          </fieldset>
        </form>
      </section>
      <section>
        <h1>
          Completed Tasks (
          {completedTasks.reduce(
            (sum, task) => sum + (task.actualMinutesToComplete ?? 0),
            0,
          )}{" "}
          min)
        </h1>
        <ul>
          {completedTasks.map((task, index) => (
            <li>
              <Task key={index} {...task}></Task>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
