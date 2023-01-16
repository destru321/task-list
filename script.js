let selected;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createElement(task) {
    const tasksContainer = document.querySelector('.tasks');

    let container = document.createElement("div");
    container.classList = "flex justify-between items-center w-full task";
    container.id = task.id;

    let taskName = document.createElement("h2");
    taskName.innerText = task.taskName;
    taskName.classList = "text-2xl w-1/2 overflow-hidden truncate name"

    let btnContainer = document.createElement("div");
    btnContainer.classList = "flex items-center"

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x";
    deleteBtn.classList = "text-xl mr-5 deleteBtn";
    deleteBtn.type = "button";

    let updateBtn = document.createElement("button");
    updateBtn.innerText = "update";
    updateBtn.classList = "text-xl updateBtn";
    updateBtn.type = "button";

    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(updateBtn);
           
    container.appendChild(taskName);
    container.appendChild(btnContainer);
    tasksContainer.appendChild(container);
}

function clickFunctions() {
    document.querySelector('.addBtn').addEventListener('click', (e) => {
        let taskName = document.querySelector('.taskName').value;
        if(e.target.innerText == "Add") {
            addTask(taskName);
            document.querySelector('.taskName').value = '';
        } else {
            updateTask(selected.id, taskName, selected.nameHolder);
            document.querySelector('.taskName').value = '';
            document.querySelector('.addBtn').innerText = "Add";
        }
    })

    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(e.target.parentNode.parentNode.parentNode) {
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                deleteTask(e.target.parentNode.parentNode.id);
            }
        })
    })

    document.querySelectorAll('.updateBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelector('.taskName').value = e.target.parentNode.parentNode.childNodes[0].innerText;
            selected = {id: e.target.parentNode.parentNode.id, nameHolder: e.target.parentNode.parentNode.childNodes[0]};
            document.querySelector('.addBtn').innerText = "Update";
        })
    })

    document.querySelectorAll('.name').forEach(name => {
        name.addEventListener('click', () => {
            document.querySelector('.wrapper').classList.add("hidden")
            if(document.querySelector('.fullName').classList.contains("hidden")) {
                document.querySelector('.fullName').classList.remove("hidden");
                document.querySelector('.fullNameText').innerHTML = name.innerText;
            }
        })
    })

    document.querySelector('.closeBtn').addEventListener('click', () => {
        document.querySelector('.wrapper').classList.remove("hidden");
        document.querySelector('.fullName').classList.add("hidden");
    })
}

 function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks;
}

 function addTask(taskName) {
    if(taskName != '') {
        let id = uuidv4();
        let obj = {
            id: id,
            taskName: taskName
        }

        let tasks = getTasks();
        let alreadyExist;
        tasks.forEach(task => {
            if(task.taskName == taskName) {
                document.querySelector('.alert').classList.remove('hidden');
                setInterval(() => {
                    document.querySelector('.alert').classList.add('hidden');
                }, 2000)
                alreadyExist = true;
            }
        })
        
        if(!alreadyExist) {
            tasks.push(obj);

            localStorage.setItem('tasks', JSON.stringify(tasks));
            createElement(obj);
            clickFunctions();
        }
    }
}

 function deleteTask(taskID) {
    let tasks = getTasks();
    let newTasks = tasks.filter((task) => {
        if(task.id != taskID) {
            return task;
        }
    });
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    clickFunctions();
}

 function updateTask(taskID, taskName, nameHolder) {
    if(taskName != '') {
        let tasks = getTasks();

        let alreadyExist;
        tasks.forEach(task => {
            if(task.taskName == taskName) {
                document.querySelector('.alert').classList.remove('hidden');
                setInterval(() => {
                    document.querySelector('.alert').classList.add('hidden');
                }, 2000)
                alreadyExist = true;
            }
        })

        if(!alreadyExist) {
            tasks.forEach(task => {
                if(task.id == taskID) {
                    task.taskName = taskName;
                }
            })
    
            localStorage.setItem('tasks', JSON.stringify(tasks));
    
            nameHolder.innerText = taskName;    
        }
    }
}

 function showTasks() {
    let data =  getTasks();
    data.forEach(task => {
        createElement(task);
    })
}

 function main() {
     showTasks();
    
    clickFunctions();
}

main();