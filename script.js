const STORAGE_KEY = "taskflow_tasks_data";
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let activeFilter = "all";
let editingTaskId = null;
const form = document.getElementById("taskForm");
const titleInput = document.getElementById("taskTitle");
const descriptionInput = document.getElementById("taskDescription");
const submitButton = document.getElementById("submitButton");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("taskPriority");
const searchInput = document.getElementById("searchInput");
const themeButton = document.getElementById("themeButton");
let searchText = "";
function saveTasks() {
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
function updateSummary() {
document.getElementById("totalCount").textContent = tasks.length;
document.getElementById("pendingCount").textContent =
tasks.filter(task => !task.completed).length;
const done = tasks.filter(task => task.completed).length;
document.getElementById("completedCount").textContent = done;
const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
document.getElementById("progressFill").style.width = percent + "%";
document.getElementById("progressText").textContent = percent + "% completed";
}
function createElement(tag, className, text) {
const element = document.createElement(tag);
if (className) element.className = className;
if (text !== undefined) element.textContent = text;
return element;
}
function renderTasks() {
updateSummary();
taskList.innerHTML = "";
const filteredTasks = tasks.filter(task =>
activeFilter === "all" ||
(activeFilter === "pending" && !task.completed) ||
(activeFilter === "completed" && task.completed)
).filter(task =>
(task.title + " " + (task.description || "")).toLowerCase().includes(searchText)
);
if (filteredTasks.length === 0) {
const empty = createElement("div", "empty-state");
empty.appendChild(createElement("div", "empty-icon", "✓"));
empty.appendChild(createElement("h3", "",
activeFilter === "all" && !searchText ? "No tasks added yet" : "No tasks found"));
empty.appendChild(createElement("p", "", "Add a task above to get started."));
taskList.appendChild(empty);
return;
}
filteredTasks.forEach(task => {
const card = createElement("article",
"task-card" + (task.completed ? " completed" : ""));
const left = createElement("div", "task-left");
const checkbox = createElement("input", "task-check");
checkbox.type = "checkbox";
checkbox.checked = task.completed;
checkbox.setAttribute("aria-label", "Mark task as completed");
checkbox.addEventListener("change", () => toggleTask(task.id));
const copy = createElement("div", "task-copy");
copy.appendChild(createElement("h3", "task-title", task.title));
if (task.description)
copy.appendChild(createElement("p", "task-description", task.description));
left.append(checkbox, copy);
const right = createElement("div", "task-right");
const level = task.priority || "medium";
right.appendChild(createElement("span", "priority " + level,
level.charAt(0).toUpperCase() + level.slice(1)));
right.appendChild(createElement("span",
"status " + (task.completed ? "completed" : "pending"),
task.completed ? "Completed" : "Pending"));
const editButton = createElement("button", "text-btn", "Edit");
editButton.type = "button";
editButton.addEventListener("click", () => editTask(task.id));
const deleteButton = createElement("button", "text-btn delete", "Delete");
deleteButton.type = "button";
deleteButton.addEventListener("click", () => deleteTask(task.id));
right.append(editButton, deleteButton);
card.append(left, right);
taskList.appendChild(card);
});
}
form.addEventListener("submit", event => {
event.preventDefault();
const title = titleInput.value.trim();
const description = descriptionInput.value.trim();
const priority = prioritySelect.value;
if (!title) return;
if (editingTaskId !== null) {
tasks = tasks.map(task =>
task.id === editingTaskId ? { ...task, title, description, priority } : task);
editingTaskId = null;
document.getElementById("formHeading").textContent = "Add a new task";
submitButton.textContent = "＋ Add task";
} else {
tasks.unshift({
id: Date.now(),
title,
description,
priority,
completed: false
});
}
saveTasks();
form.reset();
renderTasks();
titleInput.focus();
});
function toggleTask(id) {
tasks = tasks.map(task =>
task.id === id ? { ...task, completed: !task.completed } : task);
saveTasks();
renderTasks();
}
function editTask(id) {
const task = tasks.find(item => item.id === id);
if (!task) return;
editingTaskId = id;
titleInput.value = task.title;
descriptionInput.value = task.description;
prioritySelect.value = task.priority || "medium";
document.getElementById("formHeading").textContent = "Update task";
submitButton.textContent = "Save changes";
titleInput.focus();
window.scrollTo({ top: 0, behavior: "smooth" });
}
function deleteTask(id) {
if (!window.confirm("Are you sure you want to delete this task?")) return;
tasks = tasks.filter(task => task.id !== id);
if (editingTaskId === id) {
editingTaskId = null;
form.reset();
document.getElementById("formHeading").textContent = "Add a new task";
submitButton.textContent = "＋ Add task";
}
saveTasks();
renderTasks();
}
document.querySelectorAll(".filter-btn").forEach(button => {
button.addEventListener("click", () => {
activeFilter = button.dataset.filter;
document.querySelectorAll(".filter-btn")
.forEach(item => item.classList.remove("active"));
button.classList.add("active");
renderTasks();
});
});
searchInput.addEventListener("input", () => {
searchText = searchInput.value.trim().toLowerCase();
renderTasks();
});
function applyTheme(theme) {
document.documentElement.setAttribute("data-theme", theme);
themeButton.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("taskflow_theme") || "light"; } catch (e) {}
applyTheme(savedTheme);
themeButton.addEventListener("click", () => {
const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
applyTheme(next);
localStorage.setItem("taskflow_theme", next);
});
renderTasks();