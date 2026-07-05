import { Component } from "react";
import PropTypes from "prop-types";

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            deadline: "",
            is_completed: false,
            error: "",
        };
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    handleDeadlineChange = (e) => {
        this.setState({ deadline: e.target.value });
    };

    handleCompletedChange = (e) => {
        this.setState({ is_completed: e.target.checked });
    };

    validate = () => {
        const { title, deadline } = this.state;

        if (title.trim() === "") {
            this.setState({ error: "Sarlavha (title) bo'sh bo'lishi mumkin emas" });
            return false;
        }

        if (title.trim().length < 3) {
            this.setState({ error: "Sarlavha kamida 3 ta belgidan iborat bo'lishi kerak" });
            return false;
        }

        if (deadline === "") {
            this.setState({ error: "Muddatni (deadline) tanlang" });
            return false;
        }

        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(deadline).setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            this.setState({ error: "Muddat o'tgan sanadan kichik bo'lishi mumkin emas" });
            return false;
        }

        this.setState({ error: "" });
        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        const newTask = {
            title: this.state.title.trim(),
            description: this.state.description.trim(),
            deadline: this.state.deadline,
            is_completed: this.state.is_completed,
        };

        this.props.onAddTask(newTask);

        this.setState({
            title: "",
            description: "",
            deadline: "",
            is_completed: false,
            error: "",
        });
    };

    render() {
        const { title, description, deadline, is_completed, error } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Yangi vazifa qo'shish</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div>
                    <label>Sarlavha:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={this.handleTitleChange}
                        placeholder="Vazifa sarlavhasi"
                    />
                </div>

                <div>
                    <label>Tavsif:</label>
                    <textarea
                        value={description}
                        onChange={this.handleDescriptionChange}
                        placeholder="Vazifa haqida qo'shimcha ma'lumot"
                    />
                </div>

                <div>
                    <label>Muddat:</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={this.handleDeadlineChange}
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={is_completed}
                            onChange={this.handleCompletedChange}
                        />
                        Bajarilgan
                    </label>
                </div>

                <button type="submit">Qo'shish</button>
            </form>
        );
    }
}

TaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;