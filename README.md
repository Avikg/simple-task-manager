### Simple Task Manager

This is a simple task management application built using **React** with **localStorage** for persistence. It allows users to add, edit, delete, and filter tasks based on priority and completion status.

## Features
- Add, edit, delete tasks
- Search and filter tasks by priority and completion
- Tasks are stored persistently using **localStorage**
- Simple and clean UI

## Setup Instructions

### **1. Clone the Repository**
```sh
git clone https://github.com/Avikg/simple-task-manager.git
cd simple-task-manager
```

### **2. Install Dependencies**
Ensure you have **Node.js** (v16+) installed, then run:
```sh
npm install
```

### **3. Start the Development Server**
```sh
npm start
```
This will launch the app on **http://localhost:3000/**.

### **4. Build for Production (Optional)**
To create an optimized build:
```sh
npm run build
```
The built files will be inside the `build/` folder.

### **5. Running in Docker (Optional)**
```sh
docker build -t simple-task-manager .
docker run -p 3000:3000 simple-task-manager
```

---

## Project Structure
```
/simple-task-manager
│── /public
│   ├── index.html
│── /src
│   ├── /components
│   │   ├── TaskManager.jsx
│   ├── App.jsx
│   ├── index.js
│── .gitignore
│── package.json
│── README.md
```

---

## **Code Files**

### **1. `public/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Task Manager</title>
</head>
<body>
    <div id="root"></div>
    <script src="/src/index.js"></script>
</body>
</html>
```

### **2. `src/index.js`**
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### **3. `src/App.jsx`**
```javascript
import React from "react";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="App">
      <TaskManager />
    </div>
  );
}
export default App;
```

### **4. `src/components/TaskManager.jsx`**
```javascript
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
```

### **5. `.gitignore`**
```
/node_modules
/build
/dist
/.env
```