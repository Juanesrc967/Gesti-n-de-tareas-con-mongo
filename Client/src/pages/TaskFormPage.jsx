import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensaje de error
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.title || !data.description || !data.date) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (params.id) {
      console.log("Actualizando tarea con ID:", params.id); // Verificar el ID
    }

    try {
      if (params.id) {
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
        setSuccessMessage("Tarea actualizada correctamente.");
      } else {
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
        setSuccessMessage("Tarea creada correctamente.");
      }
      setTimeout(() => navigate("/tasks"), 3000);
    } catch (error) {
      console.error("Error en la actualización:", error);
      setErrorMessage("Hubo un error al actualizar la tarea.");
    }
  };



  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, [params.id, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />

        <div className="flex justify-between mt-4">

          <Button type="submit">Guardar</Button>

          <Button
            type="button"
            onClick={() => {
              if (window.confirm("¿Estás seguro de que deseas salir sin guardar los cambios?")) {
                navigate("/tasks");
              }
            }}
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Volver
          </Button>

        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>
        )}
      </form>
    </Card>
  );
}
