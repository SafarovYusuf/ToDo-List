import "bootstrap/dist/css/bootstrap.min.css";
import "./to-do.css";
import { Component } from "react";

class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      description: "",
      deadline: "",
    };
  }

  // useEffect() o'rnini bosuvchi — komponent birinchi marta yuklanganda ishga tushadi
  componentDidMount() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.setState({ tasks: JSON.parse(savedTasks) });
    }
  }

  // useEffect() o'rnini bosuvchi — state (tasks) o'zgarganda ishga tushadi
  componentDidUpdate(_prevProps: never, prevState: { tasks: never }) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleDeadlineChange = (e) => {
    this.setState({ deadline: e.target.value });
  };

  // 1) Yangi vazifa qo'shish
  addTask = () => {
    if (this.state.description.trim() === "") {
      alert("Vazifa tavsifini kiriting");
      return;
    }

    const newTask = {
      id: Date.now(),
      description: this.state.description,
      deadline: this.state.deadline,
      completed: false,
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      description: "",
      deadline: "",
    });
  };

  // 2) Vazifani bajarilgan deb belgilash / o'zgartirish
  toggleComplete = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    });
  };

  // 3) Vazifani o'chirish
  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== id),
    });
  };

  render() {
    const { tasks, description, deadline } = this.state;

    return (
      <div className="todo-app container">
        <div className="todo-card">
          <header className="todo-header">
            <h1 className="todo-title">To-Do List</h1>
            <p className="todo-sub">Oddiy va chiroyli vazifa ro'yxati</p>
          </header>

          <div className="todo-form row g-2 align-items-center">
            <div className="col-sm-7">
              <input
                className="form-control todo-input"
                type="text"
                placeholder="Vazifa tavsifi"
                value={description}
                onChange={this.handleDescriptionChange}
              />
            </div>

            <div className="col-sm-3">
              <input
                className="form-control todo-date"
                type="date"
                value={deadline}
                onChange={this.handleDeadlineChange}
              />
            </div>

            <div className="col-sm-2 d-grid">
              <button className="btn btn-primary" onClick={this.addTask}>
                Qo'shish
              </button>
            </div>
          </div>

          <ul className="todo-list">
            {tasks.length === 0 && (
              <li className="empty">Vazifa yo'q — yangi vazifa qo'shing</li>
            )}
            {tasks.map((task) => (
              <li className="todo-item" key={task.id}>
                <div className="task-main">
                  <span
                    className={
                      "task-desc " + (task.completed ? "completed" : "")
                    }
                  >
                    {task.description}
                    {task.deadline && (
                      <span className="task-dead">{` — ${task.deadline}`}</span>
                    )}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className={
                      "btn btn-sm " +
                      (task.completed
                        ? "btn-outline-secondary"
                        : "btn-outline-success")
                    }
                    onClick={() => this.toggleComplete(task.id)}
                  >
                    {task.completed ? "Bekor" : "Bajarildi"}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => this.deleteTask(task.id)}
                  >
                    O'chirish
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TaskManager.propTypes = {};

export default TaskManager;
