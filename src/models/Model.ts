import { addTask, removeTask, type Engineer } from "./Engineer";
import { complete, type Task } from "./Task";

export type Model = {
  readonly engineers: readonly Engineer[];
  readonly unassignedTasks: readonly Task[];
  readonly completedTasks: readonly Task[];
};

export function computeTotalUnassignedMinutes(model: Model): number {
  return model.unassignedTasks.reduce(
    (sum, task) => sum + task.estimatedMinutesToComplete,
    0,
  );
}

export function computeTotalCompletedMinutes(model: Model): number {
  return model.completedTasks.reduce(
    (sum, task) => sum + (task.actualMinutesToComplete ?? 0),
    0,
  );
}

export function addEngineer(model: Model, engineer: Engineer): Model {
  return {
    ...model,
    engineers: [...model.engineers, engineer],
  };
}

export function removeEngineer(model: Model, engineer: Engineer): Model {
  return {
    ...model,
    engineers: model.engineers.filter((e) => e != engineer),
  };
}

export function addUnassignedTask(model: Model, task: Task): Model {
  return {
    ...model,
    unassignedTasks: [...model.unassignedTasks, task],
  };
}

export function removeUnassignedTask(model: Model, task: Task): Model {
  return {
    ...model,
    unassignedTasks: model.unassignedTasks.filter((e) => e != task),
  };
}

export function assignTask(
  model: Model,
  task: Task,
  engineerIndex: number,
): Model {
  return {
    ...model,
    unassignedTasks: model.unassignedTasks.filter((t) => t != task),
    engineers: model.engineers.map((e, index) =>
      index === engineerIndex ? addTask(e, task) : e,
    ),
  };
}

export function completeTask(
  model: Model,
  task: Task,
  minutesToComplete: number,
  engineer: Engineer,
): Model {
  return {
    ...model,
    engineers: model.engineers.map((e) =>
      e === engineer ? removeTask(engineer, task) : e,
    ),
    completedTasks: [
      ...model.completedTasks,
      complete(task, minutesToComplete),
    ],
  };
}
