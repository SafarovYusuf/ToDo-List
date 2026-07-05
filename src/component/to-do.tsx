import 'bootstrap/dist/css/bootstrap.min.css';
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
    componentDidUpdate(_prevProps: never, prevState: { tasks: never; }) {
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
                task.id === id ? { ...task, completed: !task.completed } : task
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
            <div>
                <h1>To-Do List</h1>

                <input
                    type="text"
                    placeholder="Vazifa tavsifi"
                    value={description}
                    onChange={this.handleDescriptionChange}
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={this.handleDeadlineChange}
                />
                <button onClick={this.addTask}>Qo'shish</button>

                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
              <span
                  style={{
                      textDecoration: task.completed ? "line-through" : "none",
                  }}
              >
                {task.description} {task.deadline && `(${task.deadline})`}
              </span>
                            <button onClick={() => this.toggleComplete(task.id)}>
                                {task.completed ? "Bekor qilish" : "Bajarildi"}
                            </button>
                            <button onClick={() => this.deleteTask(task.id)}>
                                O'chirish
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

TaskManager.propTypes = {};

export default TaskManager;


