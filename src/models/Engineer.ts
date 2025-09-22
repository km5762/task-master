import type { Task } from "./Task";

export type Engineer = {
  readonly name: string;
  readonly tasks: readonly Task[];
};

export function addTask(engineer: Engineer, task: Task): Engineer {
  return {
    ...engineer,
    tasks: [...engineer.tasks, task],
  };
}

export function removeTask(engineer: Engineer, task: Task): Engineer {
  return {
    ...engineer,
    tasks: engineer.tasks.filter((t) => t != task),
  };
}

export function computeTotalAssignedMinutes(engineer: Engineer): number {
  return engineer.tasks.reduce(
    (sum, task) => sum + task.estimatedMinutesToComplete,
    0,
  );
}
