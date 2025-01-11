import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <Card>
      <header className="flex justify-between mb-4">
        <h1 className="text-3x1 font-bold text-slate-300">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)}>Eliminar</Button>
          <ButtonLink to={`/tasks/${task._id}`}>Actualizar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-200 mb-4 text-1xl">{task.description}</p>
      {/* format date */}
      <p className="text-slate-300 text-1xl">
        {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
