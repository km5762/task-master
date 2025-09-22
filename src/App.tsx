import { useState } from "react";
import "./App.css";
import Engineer from "./components/Engineer";
import Task from "./components/Task";
import {
  addEngineer,
  addUnassignedTask,
  assignTask,
  completeTask,
  computeTotalCompletedMinutes,
  computeTotalUnassignedMinutes,
  removeEngineer,
  type Model,
} from "./models/Model";
import { computeTotalAssignedMinutes } from "./models/Engineer";
import CompleteTask from "./components/CompleteTask";

function App() {
  const [model, setModel] = useState<Model>({
    engineers: [],
    unassignedTasks: [],
    completedTasks: [],
  });
  const [engineerName, setEngineerName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskEstimatedMinutesToComplete, setTaskEstimatedMinutesToComplete] =
    useState(0);
  const [actualMinutestoComplete, setActualMinutesToComplete] = useState(0);

  return (
    <>
      <section>
        <h1>Engineers</h1>
        <ul>
          {model.engineers.map((engineer, index) => (
            <li>
              <div>
                <b>
                  {engineer.name} ({computeTotalAssignedMinutes(engineer)} min)
                </b>
                <button
                  onClick={() => {
                    setModel(removeEngineer(model, engineer));
                  }}
                >
                  X
                </button>
                <ul>
                  {engineer.tasks.map((task, index) => (
                    <li>
                      <Task key={index} {...task}></Task>
                      <CompleteTask
                        onComplete={(minutesToComplete) =>
                          setModel(
                            completeTask(
                              model,
                              task,
                              minutesToComplete,
                              engineer,
                            ),
                          )
                        }
                      ></CompleteTask>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModel(addEngineer(model, { name: engineerName, tasks: [] }));
          }}
        >
          <fieldset>
            <legend>Add Engineer</legend>
            <div>
              <label htmlFor="engineer-name">Name</label>
              <input
                id="engineer-name"
                type="text"
                value={engineerName}
                onChange={(e) => setEngineerName(e.target.value)}
              />
            </div>
            <button type="submit">Add</button>
          </fieldset>
        </form>
      </section>
      <section>
        <h1>Unassigned Tasks ({computeTotalUnassignedMinutes(model)} min)</h1>
        <ul>
          {model.unassignedTasks.map((task, index) => (
            <li>
              <Task key={index} {...task}></Task>
              <button>X</button>
              <div>
                <label htmlFor="assign-task">Assign to </label>
                <select
                  name="assign-task"
                  id="assign-task"
                  onChange={(e) => {
                    setModel(assignTask(model, task, parseInt(e.target.value)));
                  }}
                >
                  <option hidden disabled selected>
                    Select an Engineer
                  </option>
                  {model.engineers.map((engineer, index) => (
                    <option value={index}>{engineer.name}</option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModel(
              addUnassignedTask(model, {
                name: taskName,
                estimatedMinutesToComplete: taskEstimatedMinutesToComplete,
              }),
            );
          }}
        >
          <fieldset>
            <legend>Add Task</legend>
            <div>
              <label htmlFor="task-name">Name</label>
              <input
                id="task-name"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="task-estimated-minutes-to-complete">
                Estimated Minutes to Complete
              </label>
              <input
                id="task-estimated-minutes-to-complete"
                type="number"
                value={taskEstimatedMinutesToComplete}
                onChange={(e) =>
                  setTaskEstimatedMinutesToComplete(parseInt(e.target.value))
                }
              />
            </div>
            <button type="submit">Add</button>
          </fieldset>
        </form>
      </section>
      <section>
        <h1>Completed Tasks ({computeTotalCompletedMinutes(model)} min)</h1>
        <ul>
          {model.completedTasks.map((task, index) => (
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
