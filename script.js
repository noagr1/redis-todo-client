const apiUrl = 'https://noa-redis-todo-server.onrender.com/';

// Load tasks when the page loads
window.onload = loadTasks;

async function loadTasks() {
    const response = await fetch(apiUrl+"tasks");
    const tasks = await response.json();
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${task.title}</strong>: ${task.description}`;
        tasksList.appendChild(item);
    });
}

async function addTask() {
    const titleInput = document.getElementById('taskTitle');
    const descriptionInput = document.getElementById('taskDescription');
    const task = {
        title: titleInput.value,
        description: descriptionInput.value
    };

    const response = await fetch(apiUrl+"tasks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        titleInput.value = '';
        descriptionInput.value = '';
        loadTasks(); // Refresh the task list
    }
}
