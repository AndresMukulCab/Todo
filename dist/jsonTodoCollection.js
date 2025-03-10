class JsonTodoCollection extends TodoCollection {
    constructor(userName, todoItems = []) {
        super(userName, []);
        this.userName = userName;
        this.storageKey = `todos-${userName}`;

        // local storage
        const storedTasks = localStorage.getItem(this.storageKey);
        if (storedTasks) {
            const dbItems = JSON.parse(storedTasks);
            dbItems.forEach(item => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
        } else {
          
            todoItems.forEach(item => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
            this.storeTasks();
        }
    }

    // guardado
    storeTasks() {
        const tasks = [...this.itemMap.values()];
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

   
}