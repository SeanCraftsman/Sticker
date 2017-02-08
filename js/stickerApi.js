var formatTime = function(num) {
    var str = String(num)
    while(str.length < 2) {
        str = '0' + str
    }
    return str
}

var time = function() {
    var d = new Date()
    year = d.getFullYear()
    month = formatTime(d.getMonth() + 1)
    day = formatTime(d.getDate())
    hour = formatTime(d.getHours())
    min = formatTime(d.getMinutes())
    return `${year}/${month}/${day}  ${hour}:${min}`
}

var getID = function() {
    var idStr = localStorage.stickersID
    if ( idStr == undefined ) {
        idStr = '0'
    }
    var id = parseInt(idStr)
    localStorage.stickersID = String(id + 1)
    return idStr
}

var getZIndex = function() {
    var c = e('#id-sticker-container')
    var z = parseInt(c.dataset.num) + 1
    c.dataset.num = z
    return c.dataset.num
}

const Todo = function(ID='', date='', zIndex='') {
    this.id = ID,
    this.title = "title",
    this.done = false,
    this.message = "<div>message</div>",
    this.date = date,
    this.deadline = " ",
    this.x = "200px",
    this.y = "100px",
    this.z = zIndex
}

var todoNew = function() {
    var d = time()
    var ID = getID()
    var zIndex = getZIndex()
    var t = new Todo(ID, d, zIndex)
    return t
}

// 保存一个 todoList
var saveTodos = function(todoList) {
    localStorage.stickers = JSON.stringify(todoList)
}
// 保存 todo
var saveTodo = function(todo) {
    var todoList = loadTodos()
    todoList.push(todo)
    saveTodos(todoList)
}
// 返回存储的所有 todo
var loadTodos = function() {
    var todoStr = localStorage.stickers
    // 第一次读取的时候，结果是 undefined
    // 所以需要设置为空数组 '[]'
    // 否则 JSON.parse 就报错了
    if (todoStr == undefined) {
        todoStr = '[]'
    }
    var todoList = JSON.parse(todoStr)
    return todoList
}


var changeTodo = function(newTodo) {
    var id = newTodo.id
    var list = loadTodos()
    var newList = []
    for(var i = 0; i < list.length; i++) {
        var todo = list[i]
        if(todo.id != id) {
            newList.push(todo)
        } else {
            newList.push(newTodo)
        }
    }
    saveTodos(newList)
}

var deleteTodo = function(id) {
    var list = loadTodos()
    var newList = []
    for(var i = 0; i < list.length; i++) {
        var todo = list[i]
        if (todo.id != id) {
            newList.push(todo)
        }
    }
    saveTodos(newList)
}

var getTodo = function(id) {
    var list = loadTodos()
    for(var i = 0; i < list.length; i++) {
        var todo = list[i]
        if (todo.id == id) {
            return todo
        }
    }
    return false
} 