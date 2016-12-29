var bindEventAddNew = function() {
	var button = e('.add-sticker')
	bindEvent(button, 'click', function(){
		var c = e('#sticker-container')
		var todo = todoNew()
		saveTodo(todo)
		showTodoList()
	})
}

var changeZIndex = function(s) {
	var container = e('#sticker-container')
	var z = container.dataset.num
	if (s.style.zIndex != z){
		var list = es('.sticker')
		for(var i = 0; i < list.length; i++) {
			var item = list[i]
			let z = parseInt(item.style.zIndex) - 1
			item.style.zIndex = z
		}
		s.style.zIndex = z
	}
}

var bindEventDrag = function() {
	var list = e('#sticker-container')
	// 事件委托
	bindEvent(list, 'mousedown', function(event){
		let target = event.target
		let s = target.closest('.sticker')
		if( s != null) {
			s.dataset.drag = 'true'
			s.dataset.diffX = event.clientX - s.offsetLeft;
			s.dataset.diffY = event.clientY - s.offsetTop;
			changeZIndex(s)
		}
	})

	var body = e('body')
	bindEvent(body, 'mousemove', function(event) {
		var list = es('.sticker')
		for(var i = 0; i < list.length; i++) {
			let s = list[i]
			let drag = s.dataset.drag
			if (drag == 'true') {
				let diffX = s.dataset.diffX
				let diffY = s.dataset.diffY
				let clientX = event.clientX
				let clientY = event.clientY
				s.style.left = clientX - diffX + 'px'
				s.style.top = clientY - diffY + 'px'
			}	
		}
	})
	bindEvent(body, 'mouseup', function() {
		removeDragAll()
		refreshTodosAll()
	})
}

var removeDragAll = function() {
	var list = es('.sticker')
	for(let i = 0; i < list.length; i++) {
		let s = list[i]
		s.dataset.drag = 'false'
	}
}

var refreshTodo = function(s, todo) {
	var message = s.querySelector('.sticker-message').innerHTML
	var title = s.querySelector('.sticker-title').innerHTML
	var done = s.classList.contains('done') ? true : false
	var deadline = s.querySelector('.finish-time').innerHTML
	var x = s.style.left
	var y = s.style.top
	var z = s.style.zIndex
	todo.message = message
	todo.title = title
	todo.done = done
	todo.deadline = deadline
	todo.x = x
	todo.y = y
	todo.z = z
}

var refreshTodosAll = function() {
	var list = es('.sticker')
	var result = []
	for(var i = 0; i < list.length; i++) {
		var s = list[i]
		var id = s.dataset.id
		var todo = getTodo(id)
		refreshTodo(s, todo)
		result.push(todo)
	}
	saveTodos(result)
}

var removeEditableAll = function() {
	var list = es('div')
	for(let i = 0; i < list.length; i++) {
		let item = list[i]
		item.removeAttribute('contenteditable')
	}
}

var notEditable = function(target, selectorList) {
	for(var i = 0; i < selectorList.length; i++) {
		let s = selectorList[i]
		let t = target.closest(s)
		if(t != null) {
			t.setAttribute('contenteditable', 'true')
			return false
		}
	}
	return true
}

var bindEventEditable = function() {
	var selectorList = ['.sticker-message', '.sticker-title', '.finish-time']
	var body = e('body')
	bindEvent(body, 'mousedown', function(event){
		var target = event.target
		if (notEditable(target, selectorList)) {
			removeEditableAll()
		}
	})
}


var initApp = function() {
	showTodoList()
	var list = es('.sticker')
	var container = e('#sticker-container')
	container.dataset.num = list.length
}

var __main = function() {
	initApp()
	bindEventAddNew()
	bindEventDrag()
	bindEventEditable()
}

__main()
