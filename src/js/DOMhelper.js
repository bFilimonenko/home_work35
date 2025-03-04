const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

const nameInput = document.getElementById("task-name");
const categoryInput = document.getElementById("task-category");
const timeInput = document.getElementById("task-time");
const difficultyInput = document.forms["task-form"].taskDifficulty;

const saveBtn = document.querySelector(".save");
const addBtn = document.querySelector(".add");

export {form, taskList, nameInput, categoryInput, timeInput, difficultyInput, saveBtn, addBtn};