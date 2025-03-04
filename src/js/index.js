import ScheduleOfTasks from "./ScheduleOfTasks.js";
import { addBtn, categoryInput, difficultyInput, form, nameInput, saveBtn, taskList, timeInput } from "./DOMhelper.js";

import "../styles.css";

const scheduleOfTasks = new ScheduleOfTasks();

let editingTaskTitle = null;

document.addEventListener("DOMContentLoaded", () => {
  updateTaskList();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = nameInput.value.trim();
  const category = categoryInput.value.trim();
  const time = timeInput.value;
  const difficulty = difficultyInput.value;

  if (!title || !category || !time || !difficulty) {
    return;
  }

  if (event.submitter.classList.contains("add")) {
    scheduleOfTasks.addTask(title, category, time, difficulty);
  }

  if (event.submitter.classList.contains("save") && editingTaskTitle) {
    scheduleOfTasks.updateTask(editingTaskTitle, { category, time, difficulty });
    editingTaskTitle = null;
    toggleButtonMode(false);
  }

  updateTaskList();
  form.reset();
});

function updateTaskList() {

  taskList.innerHTML = "";
  for (const task of scheduleOfTasks.taskGenerator()) {
    const { title, category, time, difficulty } = task;
    const li = document.createElement("li");
    li.setAttribute("class", `${difficulty}`);

    li.innerHTML = `
      <span>${title} (${category}) - ${time}</span>
      <div data-title="${title}">
      <div class="edit-btn" >✏️ Edit</div>
      <div class="delete-btn">❌ Delete</div>
      </div>`;

    taskList.appendChild(li);
  }

  if (!taskList.children.length) {
    taskList.innerHTML = "So far, it's empty here, add the task";
  }
}

taskList.addEventListener("click", (event) => {
  const title = event.target.parentElement.dataset.title;

  if (event.target.classList.contains("edit-btn")) {
    const task = scheduleOfTasks.findTask(title);
    if (!task) return;

    nameInput.value = task.title;
    categoryInput.value = task.category;
    timeInput.value = task.time;
    difficultyInput.value = task.difficulty;

    editingTaskTitle = title;
    toggleButtonMode(true);
  }

  if (event.target.classList.contains("delete-btn")) {
    scheduleOfTasks.deleteTask(title);
    updateTaskList();
  }
});

function toggleButtonMode(isEditing) {
  if (isEditing) {
    saveBtn.classList.remove("hidden");
    addBtn.classList.add("hidden");
  } else {
    saveBtn.classList.add("hidden");
    addBtn.classList.remove("hidden");
  }
}
