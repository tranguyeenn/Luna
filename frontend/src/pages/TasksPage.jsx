import React, { useState } from "react";
import { useTasks } from "../context/TasksContext.jsx";

export default function TasksPage() {
  const { tasks, setTasks } = useTasks();
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: input.trim(),
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">

      <h1 className="text-4xl font-semibold text-white">Tasks</h1>
      <p className="text-luna-muted">Manage everything you need to handle.</p>

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-luna-bg/70 border border-luna-border text-white rounded-md px-4 py-2"
          placeholder="New task..."
        />

        <button
          onClick={addTask}
          className="px-4 py-2 bg-luna-accent text-white rounded-md hover:opacity-90"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {tasks.length === 0 && (
          <p className="text-luna-muted text-sm">No tasks yet.</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-luna-surface border border-luna-border rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="accent-luna-accent"
              />

              <span
                className={`text-white ${
                  task.completed ? "line-through text-luna-muted" : ""
                }`}
              >
                {task.text}
              </span>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-rose-400 hover:text-rose-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
