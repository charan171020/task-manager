import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaTasks,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import "../styles/Dashboard.css";

const API = "https://task-manager-l102.onrender.com/api/tasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API, authHeader);
        setTasks(res.data);
      } catch {
        toast.error("Failed to load tasks");
      }
      setLoading(false);
    };

    if (!token) navigate("/");
    else fetchTasks();
  }, [token, navigate]);

  const addTask = async () => {
    if (!newTask.trim()) return toast.error("Enter a task");

    try {
      const res = await axios.post(API, { title: newTask }, authHeader);
      setTasks([res.data, ...tasks]);
      setNewTask("");
      toast.success("Task added 🚀");
    } catch {
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, authHeader);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const updateTask = async (id) => {
    try {
      const res = await axios.put(
        `${API}/${id}`,
        { title: editText },
        authHeader
      );

      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditTaskId(null);
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(
        `${API}/${task._id}`,
        { ...task, completed: !task.completed },
        authHeader
      );

      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch {
      toast.error("Error");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2><FaTasks /> Tasks</h2>
        <button onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        <div className="top">
          <h1>Dashboard</h1>
        </div>

        <div className="input-group">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
          />
          <button onClick={addTask}>
            <FaPlus />
          </button>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks yet 🚀</p>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />

                {editTaskId === task._id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => updateTask(task._id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className={task.completed ? "done" : ""}>
                      {task.title}
                    </span>
                    <button onClick={() => {
                      setEditTaskId(task._id);
                      setEditText(task.title);
                    }}>
                      <FaEdit />
                    </button>
                  </>
                )}

                <button className="delete" onClick={() => deleteTask(task._id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;