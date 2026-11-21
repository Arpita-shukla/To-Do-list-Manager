# TaskFlow | To-Do List Manager

A responsive, lightweight personal task management web application built using core frontend technologies (**HTML5, CSS3, and Vanilla JavaScript**). It helps users organize daily work, track task completion progress in real time, and persist data locally in the browser.

## Live Demo
🔗 **[View Live Project](https://<your-username>.github.io/TaskFlow/)**  
*(Note: Replace `<your-username>` with your GitHub username after enabling GitHub Pages)*

## Key Features
- **Complete Task CRUD:** Add new tasks with title, description, and priority level; edit existing tasks inline; mark tasks as completed; or delete them with confirmation.
- **Real-Time Progress Tracking:** Dynamic summary cards (Total, Pending, Completed) and an animated percentage progress bar that updates automatically.
- **Search & Status Filtering:** Instant keyword search across task titles and descriptions, paired with **All**, **Pending**, and **Completed** filter tabs.
- **Priority Tagging:** Color-coded priority badges (**High**, **Medium**, **Low**) for better visual hierarchy.
- **Dark & Light Mode:** Built-in theme toggle powered by CSS custom properties (`data-theme`), with theme preference saved automatically.
- **Persistent Local Storage:** Uses the browser `localStorage` API so tasks remain saved across page reloads without needing a backend database.
- **Responsive Layout:** Adapts cleanly across desktop, tablet, and mobile viewports.

## Tech Stack
- **HTML5:** Semantic structure (`header`, `main`, `section`, `article`) with ARIA accessibility attributes.
- **CSS3:** CSS Variables, Flexbox, CSS Grid, smooth transitions, and media queries.
- **JavaScript (ES6+):** DOM manipulation (`createElement`), event handling, array filtering, and `localStorage` state management.

## Project Structure
```text
TaskFlow/
├── index.html      # Main application markup and layout
├── style.css       # Styling, responsive rules, and dark/light theme tokens
├── script.js       # Task state logic, search/filter, and localStorage persistence
└── README.md       # Project documentation
