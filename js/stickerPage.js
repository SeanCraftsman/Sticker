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

var cardTemplate = function(todo) {
	var done = todo.done? 'done':''
	var title = todo.title
	var deadline = todo.deadline
	var id = todo.id
	var time = deadline.split(' ')[0]
	var date = deadline.split(' ')[1]
	var t = `
		<div class="todo-card" data-id=${id}>
			<span class="circle"></span>
			<div class="list-time">
				<span>${time}</span>
				<br>
				<span>${date}</span>
			</div>
			<div class="card-title ${done}">
				${title}
			</div>
		</div>
		`
	return t 
}

var insertTodoList = function(todoList) {
    var todoListDiv = e('#id-sticker-container')
    var listWindow = e('#id-list-window')
    // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    listWindow.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoTemplate(todo)
        var c = cardTemplate(todo)
        appendHtml(todoListDiv, t)
        appendHtml(listWindow, c)
    }

    
}

var detailTemplate = function(todo) {
	var done = todo.done? 'done':''
	var title = todo.title
	var time = todo.date
	var message = todo.message
	var deadline = todo.deadline
	var id = todo.id
	var t = `
	    <div class="todo-sticker" data-id=${id}>
			<div class="todo-title ${done}" spellcheck="false">
				${title}
			</div>
			<div class="todo-time">
				<div class="todo-deadline-title">deadline:</div>
				<div class="todo-finish-time">${deadline}</div>
				<div class="todo-create-time">time: ${time} </div>
			</div>	
			<div class="todo-message" spellcheck="false">
				${message}
			</div>
	`
	return t 
}

var changeDetail = function(todo) {
	var detail = e('#id-todo-detail')
	detail.innerHTML = ''
	var t = detailTemplate(todo)
	appendHtml(detail, t)
}

var bindListAnimation = function() {
	var listWindow = e('#id-list-window')
	bindEvent(listWindow, 'mousedown', function(event){
		var target = event.target
		var card = target.closest('.todo-card')
		if (card != null) {
			var id = card.dataset.id
			var todo = getTodo(id)
			changeDetail(todo)
		}
	})

	bindEvent(listWindow, 'scroll', function(event){
		
	})
}


// 加载所有 todo 并且显示在界面上
var showTodoList = function() {
    var todoList = loadTodos()
    insertTodoList(todoList)
    bindListAnimation()
}
