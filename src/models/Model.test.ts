import { expect, test } from "vitest";
import {
  addEngineer,
  addUnassignedTask,
  assignTask,
  completeTask,
  computeTotalCompletedMinutes,
  computeTotalUnassignedMinutes,
  removeEngineer,
  removeUnassignedTask,
  type Model,
} from "./Model";
import {
  addTask,
  computeTotalAssignedMinutes,
  removeTask,
  type Engineer,
} from "./Engineer";
import type { Task } from "./Task";

let model: Model = {
  engineers: [],
  unassignedTasks: [],
  completedTasks: [],
};

let engineer: Engineer = {
  name: "test",
  tasks: [],
};

let task: Task = {
  name: "task",
  estimatedMinutesToComplete: 10,
  actualMinutesToComplete: 10,
};

test("computes total unassigned minutes", () => {
  const model: Model = {
    unassignedTasks: [task, task, task],
    engineers: [],
    completedTasks: [],
  };
  expect(computeTotalUnassignedMinutes(model)).toEqual(30);
});

test("computes total completed minutes", () => {
  const model: Model = {
    unassignedTasks: [],
    engineers: [],
    completedTasks: [task, task, task],
  };
  expect(computeTotalCompletedMinutes(model)).toEqual(30);
});

test("adds engineer", () => {
  model = addEngineer(model, engineer);
  expect(model.engineers).toHaveLength(1);
  expect(model.engineers[0]).toEqual(engineer);
});

test("removes engineer", () => {
  model = addEngineer(model, engineer);
  model = removeEngineer(model, engineer);
  expect(model.engineers).toHaveLength(0);
});

test("adds unassigned task", () => {
  model = addUnassignedTask(model, task);
  expect(model.unassignedTasks).toHaveLength(1);
  expect(model.unassignedTasks[0]).toEqual(task);
});

test("removes unassigned task", () => {
  model = addUnassignedTask(model, task);
  model = removeUnassignedTask(model, task);
  expect(model.unassignedTasks).toHaveLength(0);
});

test("assigns task to engineer and removes it from unassignedTasks", () => {
  let model: Model = {
    engineers: [engineer],
    unassignedTasks: [task],
    completedTasks: [],
  };

  model = assignTask(model, task, 0);

  expect(model.unassignedTasks).toHaveLength(0);
  expect(model.engineers[0].tasks).toContain(task);
});

test("completes task, removes it from engineer, adds it to completedTasks", () => {
  let engineerWithTask: Engineer = { ...engineer, tasks: [task] };
  let model: Model = {
    engineers: [engineerWithTask],
    unassignedTasks: [],
    completedTasks: [],
  };

  const minutesToComplete = 12;

  model = completeTask(model, task, minutesToComplete, engineerWithTask);

  expect(model.engineers[0].tasks).not.toContain(task);

  expect(model.completedTasks).toHaveLength(1);
  expect(model.completedTasks[0].name).toBe(task.name);
  expect(model.completedTasks[0].actualMinutesToComplete).toBe(
    minutesToComplete,
  );
});

test("adds and computes total assigned minutes", () => {
  const eng = addTask(engineer, task);
  expect(eng.tasks).toHaveLength(1);
  expect(computeTotalAssignedMinutes(eng)).toBe(10);
});

test("removes task", () => {
  const engWithTask = addTask(engineer, task);
  const engAfterRemove = removeTask(engWithTask, task);
  expect(engAfterRemove.tasks).toHaveLength(0);
});
