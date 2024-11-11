class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.items[this.items.length - 1];
    }
}

class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
    }
    
    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }

    getItems() {
        return [...this.items];
    }
}

class TodoList {
    constructor() {
        this.taskQueue = new Queue();
        this.undoStack = new Stack();
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        this.sortSelect = document.getElementById('sortSelect');
        this.undoBtn = document.getElementById('undoBtn');
    }

    attachEventListeners() {
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        this.searchBtn.addEventListener('click', () => this.searchTask());
        this.sortSelect.addEventListener('change', (e) => this.handleSort(e.target.value));
        this.undoBtn.addEventListener('click', () => this.undo());
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (taskText !== "") {
            const task = { name: taskText, id: Date.now() };
            this.taskQueue.enqueue(task);
            this.taskInput.value = "";
            this.renderTasks();
        } else {
            alert("Tambahkan list yang ingin dibuat...");
        }
    }

    deleteTask(taskId) {
        const tasks = this.taskQueue.getItems();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            const deletedTask = tasks[taskIndex];
            this.undoStack.push(deletedTask);
            tasks.splice(taskIndex, 1);
            this.taskQueue.items = tasks;
            this.renderTasks();
        }
    }

    undo() {
        if (!this.undoStack.isEmpty()) {
            const lastTask = this.undoStack.pop();
            this.taskQueue.enqueue(lastTask);
            this.renderTasks();
        } else {
            alert("Tidak ada yang bisa di-undo!");
        }
    }

    searchTask() {
        const searchText = this.searchInput.value.trim().toLowerCase();
        
        if (searchText === "") {
            this.searchResults.innerHTML = "";
            alert("Tuliskan sesuatu!");
            return;
        }

        const tasks = this.taskQueue.getItems();
        const results = tasks.filter(task => 
            task.name.toLowerCase().includes(searchText)
        );
        
        this.renderSearchResults(results);
    }

    handleSort(value) {
        const tasks = this.taskQueue.getItems();
        
        switch(value) {
            case 'asc':
                tasks.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'desc':
                tasks.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                return;
        }
        
        this.taskQueue.items = tasks;
        this.renderTasks();
    }

    renderSearchResults(results) {
        this.searchResults.innerHTML = results
            .map(task => `<li>${task.name}</li>`)
            .join('');
    }

    renderTasks() {
        const tasks = this.taskQueue.getItems();
        this.taskList.innerHTML = tasks
            .map(task => `
                <li>
                    ${task.name}
                    <span class="delete-btn" onclick="todoList.deleteTask(${task.id})">X</span>
                </li>
            `).join('');
    }
}

// Inisialisasi TodoList
const todoList = new TodoList();
