var todoTemplate = function(todo) {
	var done = todo.done? 'done':''
	var title = todo.title
	var time = todo.date
	var message = todo.message
	var deadline = todo.deadline
	var id = todo.id
	var x = todo.x
	var y = todo.y
	var z = todo.z
	var t = `
	    <div class="sticker" data-drag='false' 
	    	 data-diff-x='0' data-diff-y='0'
	         style="z-index: ${z}; left: ${x}; top: ${y};"
	         data-id=${id}>
			<div class="sticker-title ${done}" spellcheck="false">
				${title}
			</div>
			<span class="sticker-shut">×</span>
			<div class="sticker-time">
				<div class="deadline-title">deadline:</div>
				<div class="finish-time">${deadline}</div>
				<div class="create-time">time: ${time} </div>
			</div>	
			<div class="sticker-message" spellcheck="false">
				${message}
			</div>
		</div>
	`
	return t 
}


var insertTodoList = function(todoList) {
    var todoListDiv = e('#id-sticker-container')
    // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoTemplate(todo)
        appendHtml(todoListDiv, t)
    }
}

// 加载所有 todo 并且显示在界面上
var showTodoList = function() {
    var todoList = loadTodos()
    insertTodoList(todoList)
}

