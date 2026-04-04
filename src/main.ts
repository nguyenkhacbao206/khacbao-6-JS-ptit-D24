interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

type FilterType = 'all' | 'active' | 'completed';

class TodoApp {
    private todos: Todo[] = [];
    private currentFilter: FilterType = 'all';

    constructor() {
        this.loadTodos();
        this.initEventListeners();
        this.render();
    }

    private loadTodos(): void {
        const storedTodos = localStorage.getItem('todos');
        this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    }

    private initEventListeners(): void {
        const todoInput = document.getElementById('todoInput') as HTMLInputElement;
        const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
        const filterBtns = document.querySelectorAll('.filter-btn') as NodeListOf<HTMLButtonElement>;

        // Thêm todo
        addBtn.addEventListener('click', () => this.addTodo());
        todoInput.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLButtonElement;
                filterBtns.forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.currentFilter = target.dataset.filter as FilterType;
                this.render();
            });
        });
    }

    private addTodo(): void {
        const input = document.getElementById('todoInput') as HTMLInputElement;
        const text = input.value.trim();

        if (text === '') {
            alert('Vui lòng nhập nội dung công việc!');
            return;
        }

        const todo: Todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        input.value = '';
        this.saveTodos();
        this.render();
    }

    public deleteTodo(id: number): void {
        if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.render();
        }
    }

    public toggleTodo(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    private getFilteredTodos(): Todo[] {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    private saveTodos(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    private updateStats(): void {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        const totalElement = document.getElementById('totalTasks');
        const completedElement = document.getElementById('completedTasks');
        const pendingElement = document.getElementById('pendingTasks');

        if (totalElement) totalElement.textContent = total.toString();
        if (completedElement) completedElement.textContent = completed.toString();
        if (pendingElement) pendingElement.textContent = pending.toString();
    }

    private render(): void {
        const todoList = document.getElementById('todoList');
        if (!todoList) return;

        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            let emptyMessage = 'Chưa có công việc nào. Hãy thêm công việc đầu tiên!';
            if (this.currentFilter === 'active') {
                emptyMessage = 'Không có công việc chưa hoàn thành!';
            } else if (this.currentFilter === 'completed') {
                emptyMessage = 'Chưa có công việc nào được hoàn thành!';
            }
            
            todoList.innerHTML = `<li class="empty-state">${emptyMessage}</li>`;
        } else {
            todoList.innerHTML = filteredTodos.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="todoApp.toggleTodo(${todo.id})"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">
                        🗑️ Xóa
                    </button>
                </li>
            `).join('');
        }

        this.updateStats();
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    (window as any).todoApp = new TodoApp();
});