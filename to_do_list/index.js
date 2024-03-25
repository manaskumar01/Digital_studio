let tasks = [];
function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskText = newTaskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a valid task.');
        return;
    }

    const newTask = {
        text: taskText,
        dateAdded: new Date(),
        completed: false,
        dateCompleted: null,
    };

    tasks.push(newTask);
    newTaskInput.value = '';
    displayTasks();
}
function displayTasks() {
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <span>${task.completed ? formatDate(task.dateCompleted) : formatDate(task.dateAdded)}</span>
            <button onclick="editTask(${tasks.indexOf(task)})">Edit</button>
            <button onclick="toggleComplete(${tasks.indexOf(task)})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
        `;

        if (task.completed) {
            completedList.appendChild(listItem);
        } else {
            pendingList.appendChild(listItem);
        }
    });
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].dateCompleted = tasks[index].completed ? new Date() : null;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function editTask(index) {
    const updatedText = prompt('Edit task:', tasks[index].text);
    
    if (updatedText !== null && updatedText.trim() !== '') {
        tasks[index].text = updatedText.trim();
        displayTasks();
    }
}

function formatDate(date) {
    return date ? date.toLocaleString() : '';
}

displayTasks();