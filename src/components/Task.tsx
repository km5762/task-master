export type TaskProps = {
  name: string;
  estimatedMinutesToComplete: number;
  actualMinutesToComplete?: number;
};

export default function Task({
  name,
  estimatedMinutesToComplete,
  actualMinutesToComplete,
}: TaskProps) {
  return (
    <span>
      <b>{name}</b> — Estimate: {estimatedMinutesToComplete} min
      {actualMinutesToComplete !== undefined && (
        <> — Actual: {actualMinutesToComplete} min</>
      )}
    </span>
  );
}
