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
				<input type="datetime-local" class="finish-time" value="${deadline}">
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
	if(deadline.includes('T')) {
		var time = deadline.split('T')[0]
		var date = deadline.split('T')[1]	
	} else {
		var time = " "
		var date = " "
	}
	
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
			<span class="todo-shut">×</span>
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

var limit = function(num, low, high) {
	if( num <= low) {
		num = low
	} else if (num >= high) {
		num = high
	}
	return num
}

var moveTriangle = function(id = null) {
	var t = e('#detail-triangle')
	if (id == null) {
		var id = t.dataset.id
		if (id == null) {
			return
		}
	} 
	t.dataset.id = id
	var cards = es('.todo-card')
	for (var i = 0; i < cards.length; i++) {
		var c = cards[i]
		if (c.dataset.id == id) {
			var scrollTop = e('#id-list-window').scrollTop
			var pos = c.offsetTop - scrollTop + 120
			pos = limit(pos, 120, 550)
			t.style.top = pos + 'px';
		}
	}
}

var bindListAnimation = function() {
	var listWindow = e('#id-list-window')
	bindEvent(listWindow, 'mousedown', function(event){
		var target = event.target
		var card = target.closest('.todo-card')
		if (card != null && !target.classList.contains('todo-shut')) {
			var id = card.dataset.id
			var todo = getTodo(id)
			changeDetail(todo)
			var triangle = e('detail-triangle')
			moveTriangle(id)
		}
	})

	bindEvent(listWindow, 'scroll', function(event){
		moveTriangle()
	})
}


// 加载所有 todo 并且显示在界面上
var showTodoList = function() {
    var todoList = loadTodos()
    insertTodoList(todoList)
    var id = e('.todo-sticker').dataset.id
    if (id != '${id}') {
    	var todo = getTodo(id)
    	if (todo == false) {
    		todo = new Todo()
    	}
    	changeDetail(todo)
    }
}
