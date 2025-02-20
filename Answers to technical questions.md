# Answers to Technical Questions

## 1️⃣ How long did you spend on the coding test?
I spent approximately **6-8 hours** on the coding test, including planning, implementation, UI enhancements, debugging, and writing documentation.

## 2️⃣ What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
One of the most useful features in the latest version of **JavaScript (ESNext) and React 18** is the **useTransition()** hook, which allows smoother UI updates by deferring non-urgent renders. This improves performance in React apps by preventing unnecessary re-renders during high-priority updates.

### Example:
```jsx
import React, { useState, useTransition } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isPending, startTransition] = useTransition();

  const addTask = (newTask) => {
    startTransition(() => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
  };

  return (
    <div>
      <button onClick={() => addTask({ title: 'New Task' })}>Add Task</button>
      {isPending && <p>Updating...</p>}
    </div>
  );
};

export default TaskManager;
```
This ensures that the UI remains responsive while React schedules updates efficiently.

## 3️⃣ How would you track down a performance issue in production? Have you ever had to do this?
To track down a **performance issue in production**, I would:

1. **Use Browser DevTools**: Inspect **network requests, rendering performance, and JavaScript execution time** in Chrome/Firefox DevTools.
2. **Profile React Performance**: Utilize **React Developer Tools (Profiler)** to analyze component renders and identify unnecessary re-renders.
3. **Monitor API Calls**: Check the **Network tab** for slow API responses or excessive requests.
4. **Use Lighthouse**: Run a **Lighthouse Audit** to detect performance bottlenecks.
5. **Analyze Logs & Metrics**: Use tools like **Sentry, LogRocket, or Datadog** to track errors and slow operations in production.
6. **Optimize Rendering**: Implement **memoization (React.memo, useMemo, useCallback)** to prevent unnecessary component re-renders.

### ✅ Yes, I have optimized production performance before.
In a previous project, I used **React Profiler and Memoization** to improve a dashboard's render time by **40%** by reducing unnecessary state updates.

## 4️⃣ If you had more time, what additional features or improvements would you consider adding to the task management application?
If I had more time, I would implement:

### 🚀 **Additional Features:**
- **User Authentication:** Add **sign-in/sign-up** with Firebase/Auth0.
- **Task Reminders & Notifications:** Send **email/SMS notifications** for upcoming tasks.
- **Drag & Drop Support:** Enable **Kanban-style task management** with drag-and-drop functionality.
- **Dark Mode & Custom Themes:** Allow users to **customize themes and toggle dark mode**.
- **Collaboration Features:** Allow users to **share tasks and assign them to team members**.
- **PWA (Progressive Web App) Support:** Make the app **installable and offline-friendly**.
- **Cloud Sync:** Use **Firebase or Supabase** for syncing tasks across multiple devices.

### ⚡ **Performance Improvements:**
- **Lazy Loading:** Implement **dynamic imports (React.lazy) for faster initial load times**.
- **WebSockets for Real-Time Updates:** Use WebSockets to **sync tasks across multiple users in real-time**.
- **Database Optimization:** Use an efficient **backend (MongoDB/PostgreSQL) instead of localStorage**.

These enhancements would make the Task Manager more **scalable, interactive, and user-friendly**! 🚀

