export type Task = {
  readonly name: string;
  readonly estimatedMinutesToComplete: number;
  readonly actualMinutesToComplete?: number;
};

export function complete(task: Task, minutesToComplete: number): Task {
  return {
    ...task,
    actualMinutesToComplete: minutesToComplete,
  };
}
