export default class ScheduleOfTasks {
  #tasks;

  constructor() {
    this.loadFromLocalStorage();
  }

  addTask(title, category, time, difficulty) {
    if (this.#tasks.some(task => task.title === title)) {
      alert("A task with this title already exists!");
      return;
    }

    const id = Symbol(title);
    const newTask = { id, title, category, time, difficulty };
    this.#tasks = [...this.#tasks, newTask];
    this.saveToLocalStorage();
  }

  findTask(title) {
    return this.#tasks.find(task => task.title === title);
  }

  * taskGenerator() {
    for (const task of this.#tasks.values()) {
      yield task;
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }

  loadFromLocalStorage() {
    this.#tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
  }


  updateTask(title, newData) {
    let task = this.findTask(title);
    if (!task) return;

    task.category ||= newData.category;
    task.time ??= newData.time;
    task.difficulty &&= newData.difficulty;

    this.saveToLocalStorage();
  }


  deleteTask(title) {
    this.#tasks = this.#tasks.filter(task => task.title !== title);
    this.saveToLocalStorage();
  }
}
