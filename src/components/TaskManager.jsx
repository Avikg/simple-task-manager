import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Card from "./ui/Card";

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

  const today = new Date().toISOString().split("T")[0];
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterPriority ? task.priority === filterPriority : true) &&
      (filterCompletion ? task.completed.toString() === filterCompletion : true)
    );
  });

  const upcomingTasks = filteredTasks.filter(task => task.dueDate >= today && !task.completed);
  const overdueTasks = filteredTasks.filter(task => task.dueDate < today && !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const renderTask = (task) => (
    <Card key={task.id} className="p-5 border rounded-xl shadow-lg bg-white flex justify-between items-center transition-all transform hover:scale-105 hover:shadow-xl">
      <div>
        <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
        <p className="text-gray-500 text-sm">{task.description}</p>
        <p className="text-gray-400 text-xs">Due: {task.dueDate} | Priority: <span className={`font-semibold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{task.priority}</span></p>
      </div>
      <div className="flex space-x-3">
        <Button onClick={() => toggleCompletion(task.id)} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all">{task.completed ? "Undo" : "Complete"}</Button>
        <Button onClick={() => deleteTask(task.id)} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-all">Delete</Button>
      </div>
    </Card>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Task Manager</h1>
      <div className="flex space-x-4 my-6">
        <Input placeholder="Search Tasks" value={search} onChange={(e) => setSearch(e.target.value)} className="p-3 border rounded-lg w-full shadow-sm" />
        <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} options={["All Priorities", ...priorities]} className="p-3 border rounded-lg shadow-sm" />
        <Select value={filterCompletion} onChange={(e) => setFilterCompletion(e.target.value)} options={["All", "Completed", "Incomplete"]} className="p-3 border rounded-lg shadow-sm" />
      </div>
      <h2 className="text-2xl font-semibold text-red-600 mt-6">Overdue Tasks</h2>
      {overdueTasks.length > 0 ? overdueTasks.map(renderTask) : <p className="text-gray-500">No overdue tasks.</p>}
      <h2 className="text-2xl font-semibold text-green-600 mt-6">Upcoming Tasks</h2>
      {upcomingTasks.length > 0 ? upcomingTasks.map(renderTask) : <p className="text-gray-500">No upcoming tasks.</p>}
      <h2 className="text-2xl font-semibold text-gray-600 mt-6">Completed Tasks</h2>
      {completedTasks.length > 0 ? completedTasks.map(renderTask) : <p className="text-gray-500">No completed tasks.</p>}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
        <Input placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full p-3 border rounded-lg mt-3 shadow-sm" />
        <Input placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="w-full p-3 border rounded-lg mt-3 shadow-sm" />
        <Input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} min={today} className="w-full p-3 border rounded-lg mt-3 shadow-sm" />
        <Select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} options={priorities} className="w-full p-3 border rounded-lg mt-3 shadow-sm" />
        <Button onClick={addTask} className="w-full mt-5 p-3 rounded bg-green-500 text-white hover:bg-green-600 transition-all">Add Task</Button>
      </div>
    </div>
  );
};

export default TaskManager;
