import React, { useState, useEffect } from "react";
import { Button, Input, Select, Card } from "@/components/ui";

const priorities = ["High", "Medium", "Low"];

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium", completed: false });
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCompletion, setFilterCompletion] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title || !newTask.dueDate) return;
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Medium", completed: false });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterPriority ? task.priority === filterPriority : true) &&
      (filterCompletion ? task.completed.toString() === filterCompletion : true)
    );
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <div className="flex space-x-2 my-4">
        <Input placeholder="Search Tasks" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">All Priorities</option>
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </Select>
        <Select value={filterCompletion} onChange={(e) => setFilterCompletion(e.target.value)}>
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </Select>
      </div>
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="p-3 border rounded-md flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Due: {task.dueDate} | Priority: {task.priority}</p>
            </div>
            <div>
              <Button onClick={() => toggleCompletion(task.id)}>{task.completed ? "Undo" : "Complete"}</Button>
              <Button onClick={() => deleteTask(task.id)} className="ml-2">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default TaskManager;